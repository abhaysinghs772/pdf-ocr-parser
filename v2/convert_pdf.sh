#!/usr/bin/env bash
# convert_pdf.sh
# usage: ./convert_pdf.sh input.pdf output_dir

set -e
INPUT_PDF="$1"
OUT_DIR="${2:-./images}"
mkdir -p "$OUT_DIR"

# Use pdftoppm to convert every page to PNG at 300 DPI (good OCR quality)
pdftoppm -png -r 300 "$INPUT_PDF" "${OUT_DIR}/page"

# pdftoppm will create files like page-1.png page-2.png etc.
echo "Converted PDF to images in $OUT_DIR"
