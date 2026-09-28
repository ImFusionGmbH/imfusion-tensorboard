# Copyright 2026, ImFusion.
#
# Packs/unpacks the `ImFusionLayerPluginData` proto into/from a
# `SummaryMetadata` value, following the pattern TensorBoard's built-in
# plugins use for their own metadata.
"""Internal information about the imfusion_viewer plugin."""

from tensorboard.compat.proto import summary_pb2

from imfusion_tensorboard_viewer import plugin_data_pb2

# This plugin's unique name: the HTTP route prefix and the plugin_name
# stamped on every SummaryMetadata this plugin produces.
PLUGIN_NAME = "imfusion_viewer"

# The most recent value for the `version` field of `ImFusionLayerPluginData`.
PROTO_VERSION = 0

# `SummaryMetadata.data_class` doesn't exist in older TensorBoard releases,
# so probe for it instead of assuming it's present.
try:
    _DATA_CLASS_BLOB_SEQUENCE = summary_pb2.DATA_CLASS_BLOB_SEQUENCE
    _HAS_DATA_CLASS = True
except AttributeError:
    _DATA_CLASS_BLOB_SEQUENCE = None
    _HAS_DATA_CLASS = False


def get_tag(case: str, layer: str) -> str:
    """Returns the TensorBoard tag used for a given case/layer pair."""
    return f"{case}/{layer}"


def _kind_to_enum(kind):
    """Coerces `kind` (a `LayerKind` int, name, or already-enum value) to the
    integer enum value expected by the `ImFusionLayerPluginData` proto."""
    if isinstance(kind, str):
        try:
            return plugin_data_pb2.LayerKind.Value(kind.upper())
        except ValueError as exc:
            raise ValueError(
                f"Unknown LayerKind name: {kind!r}. Valid names: "
                f"{list(plugin_data_pb2.LayerKind.keys())}"
            ) from exc
    return int(kind)


def _normalize_color(color):
    """Pads an RGB triple to opaque RGBA; passes RGBA through unchanged.

    The viewer binds this to `LabelConfig.color`, a fixed-length vec4, and
    embind rejects a 3-element array outright, so a documented RGB color would
    otherwise produce a layer that never loads.
    """
    values = [float(c) for c in color]
    if len(values) == 3:
        return values + [1.0]
    if len(values) != 4:
        raise ValueError(
            f"default_color must have 3 or 4 components, got {len(values)}"
        )
    return values


def create_summary_metadata(
    case_name,
    layer_name,
    kind,
    file_extension,
    zlib_compressed,
    display_name=None,
    default_color=(1, 1, 1, 1),
    default_opacity=1.0,
    default_visible=True,
    order=0,
    json_extra="",
):
    """Creates a `summary_pb2.SummaryMetadata` proto for imfusion_viewer data.

    Args:
      case_name: Name of the case (e.g. patient/subject id) this layer
        belongs to.
      layer_name: Name of this layer within the case (e.g. "ct_volume").
      kind: A `LayerKind` value: an int, the enum's name as a string
        (e.g. "VOLUME"), or the enum value itself.
      file_extension: File extension (including leading dot) describing how
        to interpret the raw (post-decompression) bytes, e.g. ".nii".
      zlib_compressed: Whether the blob payload is zlib-compressed.
      display_name: Optional human-readable name; defaults to `layer_name`.
      default_color: An iterable of 3 or 4 floats (RGB or RGBA), defaults to
        opaque white. RGB is padded to opaque RGBA, since the viewer's
        `LabelConfig.color` is a fixed-length vec4.
      default_opacity: Default rendering opacity, defaults to 1.0.
      default_visible: Whether the layer should be visible by default.
      order: Sort order among layers of the same case (ascending).
      json_extra: Optional arbitrary JSON-encoded string for extra,
        forward-compatible per-layer configuration.

    Returns:
      A `summary_pb2.SummaryMetadata` protobuf object.
    """
    content = plugin_data_pb2.ImFusionLayerPluginData(
        version=PROTO_VERSION,
        case_name=case_name,
        layer_name=layer_name,
        kind=_kind_to_enum(kind),
        file_extension=file_extension,
        zlib_compressed=bool(zlib_compressed),
        display_name=display_name if display_name is not None else layer_name,
        default_color=_normalize_color(default_color),
        default_opacity=default_opacity,
        default_visible=bool(default_visible),
        order=order,
        json_extra=json_extra,
    )

    metadata = summary_pb2.SummaryMetadata(
        plugin_data=summary_pb2.SummaryMetadata.PluginData(
            plugin_name=PLUGIN_NAME,
            content=content.SerializeToString(),
        ),
    )
    if _HAS_DATA_CLASS:
        metadata.data_class = _DATA_CLASS_BLOB_SEQUENCE
    return metadata


def parse_plugin_metadata(content: bytes):
    """Parses the `content` field of a `SummaryMetadata` proto belonging to
    this plugin back into an `ImFusionLayerPluginData` message.

    Tolerant of missing/unknown fields (proto3 default value applies).

    Args:
      content: The `content` field of a `SummaryMetadata` proto
        corresponding to this plugin (i.e.
        `SummaryMetadata.plugin_data.content`).

    Returns:
      An `ImFusionLayerPluginData` protobuf object.
    """
    if not isinstance(content, bytes):
        raise TypeError("Content type must be bytes")
    result = plugin_data_pb2.ImFusionLayerPluginData.FromString(content)
    # No prior versions exist yet, so no migration logic is needed. Future
    # versions should branch on `result.version` here if the schema changes.
    return result
