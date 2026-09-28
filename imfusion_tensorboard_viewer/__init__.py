# Copyright 2026, ImFusion.
"""The imfusion_viewer TensorBoard plugin package.

Re-exports the framework-agnostic writer API (`summary.py`) and the
metadata helpers (`metadata.py`) for convenient importing by training code,
e.g.:

    from imfusion_tensorboard_viewer import CaseWriter, write_case
"""

from imfusion_tensorboard_viewer import metadata
from imfusion_tensorboard_viewer.summary import CaseWriter, write_case

__all__ = [
    "CaseWriter",
    "write_case",
    "metadata",
]
