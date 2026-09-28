# Copyright 2026, ImFusion.
#
# TensorBoard backend plugin for imfusion_viewer.
"""The imfusion_viewer TensorBoard plugin."""

import logging
import os
import zlib

import nibabel as nib
import numpy as np
from tensorboard import context, errors, plugin_util
from tensorboard.backend import http_util
from tensorboard.data import provider
from tensorboard.plugins import base_plugin
from werkzeug import wrappers
from werkzeug.utils import send_file

from imfusion_tensorboard_viewer import metadata, plugin_data_pb2

logger = logging.getLogger(__name__)

# `downsample=` for `read_blob_sequences`; doesn't affect TensorBoard core's
# own retention limit (see the log message in __init__ below).
_DEFAULT_DOWNSAMPLE = 1000

# WebSDK license token env var; handed to the frontend, which is readable by
# anyone who can reach this server.
_LICENSE_TOKEN_ENV_VAR = "IMFUSION_WEBSDK_LICENSE_TOKEN"

_STATIC_DIR_NAME = "static"
_INDEX_JS_FILENAME = "index.js"
_WASM_FILENAME = "ImFusionLib.wasm"

# Non-overlapping label-value range per merged run in /combined_layer_data;
# must match the frontend's own constant.
_COMBINED_LABEL_OFFSET_STEP = 1000

# /layer_data's crop_axis indexes a volume's own i/j/k storage axes, not a
# world-space direction.
_CROP_AXES = {"x": 0, "y": 1, "z": 2}


def _crop_volume_blob(blob, compressed, axis, position):
    """Zeroes voxels beyond `position` (0..1 fraction, 1 = uncropped) along
    one storage axis, for a 3D cross-section - the WebSDK has no clip-plane
    API, so this edits the voxel data server-side instead. Cropped voxels
    are set to the volume's own minimum intensity, not a fixed 0.
    """
    raw = zlib.decompress(blob) if compressed else bytes(blob)
    img = nib.Nifti1Image.from_bytes(raw)
    arr = np.array(img.dataobj)  # a real (writable) copy, not a lazy proxy
    axis_idx = _CROP_AXES[axis]
    if axis_idx >= arr.ndim:
        raise ValueError(f"axis {axis!r} out of range for a {arr.ndim}D volume")
    size = arr.shape[axis_idx]
    cutoff = int(round(position * (size - 1)))
    slicer = [slice(None)] * arr.ndim
    slicer[axis_idx] = slice(cutoff + 1, None)
    arr[tuple(slicer)] = arr.min()
    cropped = nib.Nifti1Image(arr, img.affine, img.header)
    out = cropped.to_bytes()
    return zlib.compress(out) if compressed else out


class ImFusionViewerPlugin(base_plugin.TBPlugin):
    """TensorBoard plugin for viewing ImFusion spatial (volume/mask/mesh/2D
    image) training outputs, organized as named cases each containing named
    layers."""

    plugin_name = metadata.PLUGIN_NAME

    def __init__(self, context):
        """context: a `base_plugin.TBContext` instance."""
        self._data_provider = context.data_provider
        self._downsample_to = (context.sampling_hints or {}).get(
            self.plugin_name, _DEFAULT_DOWNSAMPLE
        )
        self._static_dir = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), _STATIC_DIR_NAME
        )
        logger.info(
            "imfusion_viewer: by default TensorBoard retains only the last "
            "~10 steps per layer for long-running/live training. Pass "
            "--samples_per_plugin imfusion_viewer=<N> (e.g. 1000) on the "
            "tensorboard command line to retain full step history."
        )

    # ------------------------------------------------------------------
    # base_plugin.TBPlugin interface
    # ------------------------------------------------------------------

    def get_plugin_apps(self):
        return {
            "/index.js": self._serve_index_js,
            "/wasm/" + _WASM_FILENAME: self._serve_wasm,
            "/cases": self._serve_cases,
            "/layer_data": self._serve_layer_data,
            "/combined_layer_data": self._serve_combined_layer_data,
            "/license_token": self._serve_license_token,
        }

    def is_active(self):
        """Whether this plugin has any data to show."""
        if self._data_provider is None:
            return False
        try:
            # No request here; newer TensorBoard rejects ctx=None.
            mapping = self._data_provider.list_blob_sequences(
                context.RequestContext(),
                experiment_id="",
                plugin_name=metadata.PLUGIN_NAME,
            )
        except errors.PublicError:
            return False
        return bool(mapping)

    def frontend_metadata(self):
        # disable_reload left at its default (False): core-level UI, and
        # this ES-module/iframe plugin polls independently anyway.
        return base_plugin.FrontendMetadata(
            es_module_path="/index.js",
            tab_name="IMFUSION VIEWER",
        )

    # ------------------------------------------------------------------
    # Static asset routes
    # ------------------------------------------------------------------

    @wrappers.Request.application
    def _serve_index_js(self, request):
        path = os.path.join(self._static_dir, _INDEX_JS_FILENAME)
        if not os.path.isfile(path):
            return http_util.Respond(
                request, "index.js not found", "text/plain", code=404
            )
        with open(path, "rb") as f:
            content = f.read()
        return http_util.Respond(request, content, "text/javascript")

    @wrappers.Request.application
    def _serve_wasm(self, request):
        path = os.path.join(self._static_dir, _WASM_FILENAME)
        if not os.path.isfile(path):
            return http_util.Respond(
                request, "ImFusionLib.wasm not found", "text/plain", code=404
            )
        # Streamed via werkzeug's send_file (supports Range/conditional GETs).
        return send_file(path, request.environ, mimetype="application/wasm")

    @wrappers.Request.application
    def _serve_license_token(self, request):
        """Returns the WebSDK license token from the environment, or `null`."""
        return http_util.Respond(
            request,
            {"license_token": os.environ.get(_LICENSE_TOKEN_ENV_VAR) or None},
            "application/json",
        )

    # ------------------------------------------------------------------
    # Data routes
    # ------------------------------------------------------------------

    def _cases_impl(self, ctx, experiment):
        """Builds `/cases`: {run: {case_name: {"layers": [...], "steps": [...]}}}."""
        sequence_mapping = self._data_provider.list_blob_sequences(
            ctx,
            experiment_id=experiment,
            plugin_name=metadata.PLUGIN_NAME,
        )

        # list_blob_sequences has no step info; read_blob_sequences fills it in.
        datum_mapping = self._data_provider.read_blob_sequences(
            ctx,
            experiment_id=experiment,
            plugin_name=metadata.PLUGIN_NAME,
            downsample=self._downsample_to,
        )

        result = {}
        for run, tag_to_content in sequence_mapping.items():
            cases = {}
            for tag, time_series in tag_to_content.items():
                layer_pd = metadata.parse_plugin_metadata(
                    time_series.plugin_content
                )
                case_entry = cases.setdefault(
                    layer_pd.case_name, {"layers": [], "steps": set()}
                )
                # Each layer's own steps - layers can have different cadences.
                layer_steps = sorted(
                    datum.step
                    for datum in datum_mapping.get(run, {}).get(tag, [])
                )
                case_entry["layers"].append(
                    {
                        "steps": layer_steps,
                        "layer_name": layer_pd.layer_name,
                        "kind": plugin_data_pb2.LayerKind.Name(layer_pd.kind),
                        "file_extension": layer_pd.file_extension,
                        "zlib_compressed": layer_pd.zlib_compressed,
                        "display_name": layer_pd.display_name,
                        "default_color": list(layer_pd.default_color),
                        "default_opacity": layer_pd.default_opacity,
                        "default_visible": layer_pd.default_visible,
                        "order": layer_pd.order,
                        "json_extra": layer_pd.json_extra,
                    }
                )
                # The case-wide union drives the epoch scrubber's range.
                case_entry["steps"].update(layer_steps)

            for case_entry in cases.values():
                case_entry["layers"].sort(key=lambda layer: layer["order"])
                case_entry["steps"] = sorted(case_entry["steps"])

            result[run] = cases
        return result

    @wrappers.Request.application
    def _serve_cases(self, request):
        ctx = plugin_util.context(request.environ)
        experiment = plugin_util.experiment_id(request.environ)
        try:
            result = self._cases_impl(ctx, experiment)
        except errors.PublicError as e:
            return http_util.Respond(request, str(e), "text/plain", code=400)
        return http_util.Respond(request, result, "application/json")

    def _read_layer_blob(self, ctx, experiment, run, case, layer, step):
        """Raw blob bytes for one run/case/layer/step. Raises `LookupError`
        (not `PublicError`) if not found, for callers to turn into their own
        HTTP response."""
        tag = metadata.get_tag(case, layer)
        datum_mapping = self._data_provider.read_blob_sequences(
            ctx,
            experiment_id=experiment,
            plugin_name=metadata.PLUGIN_NAME,
            downsample=self._downsample_to,
            run_tag_filter=provider.RunTagFilter(runs=[run], tags=[tag]),
        )
        data = datum_mapping.get(run, {}).get(tag)
        if not data:
            raise LookupError(
                f"No data for run={run!r}, case={case!r}, layer={layer!r}"
            )
        datum = next((d for d in data if d.step == step), None)
        if datum is None or not datum.values:
            raise LookupError(
                f"No data at step={step!r} for run={run!r}, case={case!r}, "
                f"layer={layer!r}"
            )
        return self._data_provider.read_blob(
            ctx, blob_key=datum.values[0].blob_key
        )

    @wrappers.Request.application
    def _serve_layer_data(self, request):
        ctx = plugin_util.context(request.environ)
        experiment = plugin_util.experiment_id(request.environ)

        run = request.args.get("run")
        case = request.args.get("case")
        layer = request.args.get("layer")
        step_str = request.args.get("step")
        if not run or not case or not layer or step_str is None:
            return http_util.Respond(
                request,
                "Required query parameters: run, case, layer, step",
                "text/plain",
                code=400,
            )
        try:
            step = int(step_str)
        except ValueError:
            return http_util.Respond(
                request, "step must be an integer", "text/plain", code=400
            )

        # Optional cross-section crop (see `_crop_volume_blob`); both or neither.
        crop_axis = request.args.get("crop_axis")
        crop_position_str = request.args.get("crop_position")
        crop_position = None
        if crop_axis is not None or crop_position_str is not None:
            if crop_axis not in _CROP_AXES or crop_position_str is None:
                return http_util.Respond(
                    request,
                    "crop_axis and crop_position must both be given; "
                    f"crop_axis must be one of {sorted(_CROP_AXES)}",
                    "text/plain",
                    code=400,
                )
            try:
                crop_position = min(1.0, max(0.0, float(crop_position_str)))
            except ValueError:
                return http_util.Respond(
                    request, "crop_position must be a number", "text/plain", code=400
                )

        try:
            blob = self._read_layer_blob(ctx, experiment, run, case, layer, step)
        except errors.PublicError as e:
            return http_util.Respond(request, str(e), "text/plain", code=400)
        except LookupError as e:
            return http_util.Respond(request, str(e), "text/plain", code=404)

        if crop_axis is not None:
            compressed = request.args.get("compressed") != "false"
            try:
                blob = _crop_volume_blob(blob, compressed, crop_axis, crop_position)
            except Exception as e:
                return http_util.Respond(
                    request,
                    f"Failed to crop layer {layer!r}: {e}",
                    "text/plain",
                    code=400,
                )

        return http_util.Respond(request, blob, "application/octet-stream")

    @wrappers.Request.application
    def _serve_combined_layer_data(self, request):
        """Merges several (run, layer) mask volumes into ONE combined NIfTI
        label volume (the WebSDK's 3D view can only render one LABEL
        SharedImageSet at a time, so every contributing pair must land in a
        single object, not one merged object per layer name).

        Query params: case, step, pairs (comma-separated `run:layer` tokens,
        order matters - see `_COMBINED_LABEL_OFFSET_STEP`), compressed.
        Later pairs win where masks overlap. Returns a zlib-compressed NIfTI
        blob, or 409 if the volumes don't share a voxel grid.
        """
        ctx = plugin_util.context(request.environ)
        experiment = plugin_util.experiment_id(request.environ)

        case = request.args.get("case")
        step_str = request.args.get("step")
        pairs_str = request.args.get("pairs")
        compressed_str = request.args.get("compressed")
        if not case or step_str is None or not pairs_str:
            return http_util.Respond(
                request,
                "Required query parameters: case, step, pairs",
                "text/plain",
                code=400,
            )
        try:
            step = int(step_str)
        except ValueError:
            return http_util.Respond(
                request, "step must be an integer", "text/plain", code=400
            )
        pairs = []
        for token in pairs_str.split(","):
            if not token:
                continue
            run, sep, layer = token.partition(":")
            if not sep or not run or not layer:
                return http_util.Respond(
                    request,
                    f"Malformed pairs token {token!r}, expected run:layer",
                    "text/plain",
                    code=400,
                )
            pairs.append((run, layer))
        if len(pairs) < 2:
            return http_util.Respond(
                request, "pairs must list at least 2 run:layer entries",
                "text/plain", code=400,
            )
        compressed = compressed_str != "false"

        images = []
        for run, layer in pairs:
            try:
                blob = self._read_layer_blob(ctx, experiment, run, case, layer, step)
            except errors.PublicError as e:
                return http_util.Respond(request, str(e), "text/plain", code=400)
            except LookupError as e:
                return http_util.Respond(request, str(e), "text/plain", code=404)
            if compressed:
                blob = zlib.decompress(blob)
            try:
                images.append(nib.Nifti1Image.from_bytes(bytes(blob)))
            except Exception as e:
                return http_util.Respond(
                    request,
                    f"Layer {layer!r} for run {run!r} isn't a readable NIfTI "
                    f"volume: {e}",
                    "text/plain",
                    code=400,
                )

        reference = images[0]
        for (run, layer), img in zip(pairs[1:], images[1:]):
            if img.shape != reference.shape or not np.allclose(
                img.affine, reference.affine, atol=1e-3
            ):
                return http_util.Respond(
                    request,
                    f"Run {run!r}'s {layer!r} volume doesn't share the same "
                    f"grid as {pairs[0][0]!r}'s {pairs[0][1]!r} (shape/affine "
                    "differ) - these runs' masks can't be merged for "
                    "combined 3D display.",
                    "application/json",
                    code=409,
                )

        combined = np.zeros(reference.shape, dtype=np.int32)
        for i, img in enumerate(images):
            arr = np.asarray(img.dataobj)
            offset = i * _COMBINED_LABEL_OFFSET_STEP
            nonzero = arr > 0
            # Later pairs overwrite earlier ones on overlap.
            combined[nonzero] = arr[nonzero].astype(np.int32) + offset

        merged = nib.Nifti1Image(combined, reference.affine)
        payload = merged.to_bytes()
        payload = zlib.compress(payload)
        return http_util.Respond(request, payload, "application/octet-stream")
