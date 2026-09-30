# Copyright 2026, ImFusion.
#
# Framework-agnostic writer for imfusion_viewer summary data: no hard
# dependency on TensorFlow or PyTorch, writes directly to a tfevents file
# via TensorBoard's own low-level `EventFileWriter`.
"""Framework-agnostic writer for imfusion_viewer per-case, per-layer data."""

import json
import numbers
import time
import zlib

from tensorboard.compat.proto import event_pb2
from tensorboard.plugins.scalar.summary_v2 import scalar_pb
from tensorboard.summary.writer.event_file_writer import EventFileWriter
from tensorboard.util import tensor_util

from imfusion_tensorboard_viewer import metadata, plugin_data_pb2

# Mirrors labelColors.ts's `LABEL_COLOR_PALETTE` (RGB only; alpha comes
# from `opacity`). No shared source: keep both copies in sync by hand.
_DEFAULT_MASK_COLOR_PALETTE = [
    (0.90, 0.25, 0.25),
    (0.25, 0.75, 0.35),
    (0.30, 0.55, 0.95),
    (0.95, 0.60, 0.15),
    (0.65, 0.35, 0.90),
    (0.20, 0.75, 0.80),
    (0.85, 0.80, 0.20),
    (0.90, 0.45, 0.65),
    (0.60, 0.40, 0.25),
    (0.60, 0.60, 0.60),
]


def _is_mask_kind(kind) -> bool:
    """Whether `kind` (in any of `write_layer`'s accepted forms) is MASK."""
    return metadata._kind_to_enum(kind) == plugin_data_pb2.LayerKind.MASK


class CaseWriter:
    """Writes imfusion_viewer layer data (per case, per training step) to a
    TensorBoard event file.

    Each `write_layer` call appends one `Event` with a single length-1
    DT_STRING tensor holding the (optionally zlib-compressed) layer bytes,
    tagged `"<case>/<layer>"`; TensorBoard treats it as a one-blob sequence.
    """

    def __init__(self, logdir: str, max_queue_size: int = 10, flush_secs: int = 120):
        """Creates a `CaseWriter` that writes into `logdir`.

        Args:
          logdir: Directory in which to create (or append to) an event file.
          max_queue_size: Size of the async write queue; forwarded to
            `EventFileWriter`.
          flush_secs: How often, in seconds, to auto-flush to disk; forwarded
            to `EventFileWriter`.
        """
        self._ev = EventFileWriter(
            logdir, max_queue_size=max_queue_size, flush_secs=flush_secs
        )

    def write_layer(
        self,
        case: str,
        layer: str,
        data: bytes,
        *,
        step: int,
        kind: str,
        file_extension: str,
        compress: bool = True,
        color=None,
        opacity: float = 1.0,
        visible: bool = True,
        order: int = 0,
        wall_time=None,
        display_name=None,
        json_extra: str = "",
        label_names: dict[int, str] | None = None,
        label_value: int = 1,
    ) -> None:
        """Writes one layer's data for one case at one training step.

        Args:
          case: Case name (e.g. subject/patient id), used as the tag prefix.
          layer: Layer name (e.g. "ct_volume"), used as the tag suffix.
          data: Raw, uncompressed bytes for this layer at this step.
          step: Training step (e.g. epoch number).
          kind: A `LayerKind` value: int, enum name string, or enum value.
          file_extension: File extension (with leading dot), e.g. ".nii".
          compress: If True (default), zlib-compress `data` before writing.
          color: Default RGB color. Only meaningful for the
            single-value mask path (`kind="MASK"` with no `label_names`);
            ignored when `label_names` is given. If left `None` for such a
            mask, a color is auto-picked from the same palette used for
            `label_names`, indexed by `order`; otherwise defaults to opaque
            white.
          opacity: Unsupported, leave at 1.0 (3D renders it as a paler
            color, not transparency).
          visible: Whether this layer should be visible by default.
          order: Sort order among layers of the same case.
          wall_time: Optional wall-clock time for this event; defaults to
            `time.time()`.
          display_name: Optional human-readable display name for this layer.
          json_extra: Optional arbitrary JSON-encoded string of extra
            per-layer configuration. Mutually exclusive with `label_names`
            and with a non-default `label_value` (all three write the same
            proto field); passing more than one raises `ValueError`.
          label_names: For multi-class `kind="MASK"` layers: a dict mapping
            each integer pixel/label value to a display name, e.g.
            `{1: "liver", 2: "tumor", 3: "vessel"}`; 0 is background and
            never drawn. JSON-encoded into
            `json_extra`; the frontend then auto-assigns each label value
            its own color from a fixed palette, so don't also pass
            `color=`. Mutually exclusive with an explicit `json_extra`.
          label_value: For the single-implicit-label mask path (`kind=
            "MASK"` with no `label_names`): which pixel value counts as the
            one foreground label. Defaults to 1, but real binary masks
            commonly use the full 0-255 byte range instead (e.g.
            background=0, foreground=255); pass the actual value (e.g.
            `label_value=255`) or the mask renders nothing visible.
            Mutually exclusive with `label_names` and with an explicit
            `json_extra`.
        """
        if label_names is not None and label_value != 1:
            raise ValueError(
                "write_layer: `label_value` only applies to the "
                "single-implicit-label path (no `label_names`) -- pass the "
                "desired pixel value(s) as key(s) of `label_names` instead "
                "when using multi-class labels."
            )

        if label_names is not None:
            bad = [v for v in label_names if isinstance(v, bool) or not isinstance(v, numbers.Integral)]
            if bad:
                raise ValueError(f"write_layer: `label_names` keys must be integers, got {bad!r}")

        extra_payload = None
        if label_names is not None:
            extra_payload = {
                "labels": {str(int(value)): name for value, name in label_names.items()}
            }
        elif label_value != 1:
            extra_payload = {"labelValue": label_value}

        if extra_payload is not None:
            if json_extra:
                raise ValueError(
                    "write_layer: pass only one of `label_names`/"
                    "`label_value` or `json_extra`, not both -- they all "
                    "populate the same underlying `json_extra` proto field "
                    "and would silently conflict."
                )
            json_extra = json.dumps(extra_payload)

        if color is None:
            if label_names is None and _is_mask_kind(kind):
                r, g, b = _DEFAULT_MASK_COLOR_PALETTE[order % len(_DEFAULT_MASK_COLOR_PALETTE)]
                color = (r, g, b, opacity)
            else:
                color = (1.0, 1.0, 1.0, 1.0)

        if wall_time is None:
            wall_time = time.time()

        payload = zlib.compress(data) if compress else data

        tensor_proto = tensor_util.make_tensor_proto([payload])

        summary_metadata = metadata.create_summary_metadata(
            case_name=case,
            layer_name=layer,
            kind=kind,
            file_extension=file_extension,
            zlib_compressed=compress,
            display_name=display_name,
            default_color=color,
            default_opacity=opacity,
            default_visible=visible,
            order=order,
            json_extra=json_extra,
        )

        event = event_pb2.Event(wall_time=wall_time, step=step)
        event.summary.value.add(
            tag=metadata.get_tag(case, layer),
            tensor=tensor_proto,
            metadata=summary_metadata,
        )
        self._ev.add_event(event)

    def write_scalar(
        self, tag: str, value: float, *, step: int, wall_time: float | None = None
    ) -> None:
        """Writes a standard TensorBoard scalar summary through this
        CaseWriter's own EventFileWriter, so scalars and layer data share one
        growing event file. TensorBoard's directory watcher tolerates only
        one actively-growing file per run directory; a second writer pointed
        at the same directory would have its data silently dropped.

        Args:
          tag: Scalar tag name (e.g. "loss/train").
          value: Scalar value for this step.
          step: Training step (e.g. epoch number).
          wall_time: Optional wall-clock time for this event; defaults to
            `time.time()`.
        """
        if wall_time is None:
            wall_time = time.time()

        summary = scalar_pb(tag, value)
        event = event_pb2.Event(wall_time=wall_time, step=step)
        event.summary.CopyFrom(summary)
        self._ev.add_event(event)

    def flush(self) -> None:
        """Flushes any pending events to disk."""
        self._ev.flush()

    def close(self) -> None:
        """Flushes and closes the underlying event file writer."""
        self._ev.close()


def write_case(writer: CaseWriter, case: str, step: int, layers: dict, **common_kwargs) -> None:
    """Writes multiple layers for a single case at a single step.

    Args:
      writer: A `CaseWriter` to write through.
      case: Case name shared by all layers in this call.
      step: Training step shared by all layers in this call.
      layers: A dict mapping layer name to a dict of kwargs for
        `CaseWriter.write_layer`, e.g.:
          {
              "ct_volume": {
                  "data": raw_bytes,
                  "kind": "VOLUME",
                  "file_extension": ".nii",
              },
              "segmentation_mask": {
                  "data": mask_bytes,
                  "kind": "MASK",
                  "file_extension": ".nii",
                  "color": (1, 0, 0, 0.5),
                  "order": 1,
              },
          }
      **common_kwargs: Additional kwargs applied to every layer in this call
        (e.g. `compress=False`), overridden by any per-layer value of the
        same name.
    """
    for layer_name, layer_kwargs in layers.items():
        kwargs = dict(common_kwargs)
        kwargs.update(layer_kwargs)
        writer.write_layer(case, layer_name, step=step, **kwargs)
