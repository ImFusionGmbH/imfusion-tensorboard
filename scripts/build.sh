#!/usr/bin/env bash
#
# Builds or installs imfusion-tensorboard.
#
# The prebuilt frontend (static/index.js) and the WebSDK wasm
# (static/ImFusionLib.wasm) are committed to the repo, so no
# Node/npm is needed.
#
# Usage:
#   scripts/build.sh             # build a wheel into dist/
#   scripts/build.sh --editable  # pip install -e . into the current env
#
# Requires: python3 (or set PYTHON=/path/to/python).

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

STATIC_DIR="imfusion_tensorboard_viewer/static"
OUT_DIR="dist"

EDITABLE=0
for arg in "$@"; do
  case "$arg" in
    --editable) EDITABLE=1 ;;
    -h|--help) sed -n '2,13p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Unknown option: $arg (see --help)" >&2; exit 2 ;;
  esac
done

for f in index.js ImFusionLib.wasm; do
  if [[ ! -f "$STATIC_DIR/$f" ]]; then
    echo "ERROR: $STATIC_DIR/$f is missing." >&2
    exit 1
  fi
done

# Prefer the project's own venv if present; override with PYTHON=... .
if [[ -z "${PYTHON:-}" ]]; then
  if [[ -x "$REPO_ROOT/.venv/bin/python" ]]; then
    PYTHON="$REPO_ROOT/.venv/bin/python"
  else
    PYTHON="python3"
  fi
fi

echo "==> Using interpreter: $PYTHON ($("$PYTHON" --version))"

if [[ "$EDITABLE" == "1" ]]; then
  echo "==> Installing in editable mode"
  "$PYTHON" -m pip install -e .
  echo ""
  echo "==> Installed editable. Run: tensorboard --logdir <your_logdir>"
  exit 0
fi

if ! "$PYTHON" -m pip show build >/dev/null 2>&1; then
  echo "==> Installing the 'build' package"
  "$PYTHON" -m pip install --quiet build
fi

echo "==> Building wheel into $OUT_DIR/"
rm -rf "$OUT_DIR"
"$PYTHON" -m build --wheel --outdir "$OUT_DIR"

WHEEL_PATH="$(ls -1 "$OUT_DIR"/*.whl | head -n1)"
WHEEL_SIZE="$(du -h "$WHEEL_PATH" | cut -f1 | tr -d '[:space:]')"

echo ""
echo "==> Built wheel: $WHEEL_PATH ($WHEEL_SIZE)"
echo "    Install with: pip install $WHEEL_PATH"
