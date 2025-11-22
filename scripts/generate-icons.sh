#!/bin/bash

# Icon Generator Script for Vision Assistant
# This script generates all required PWA icons from a single source image
# 
# Usage: ./scripts/generate-icons.sh path/to/your-icon-512x512.png

if [ -z "$1" ]; then
    echo "Usage: ./scripts/generate-icons.sh path/to/your-icon-512x512.png"
    echo ""
    echo "This script requires ImageMagick to be installed:"
    echo "  macOS: brew install imagemagick"
    echo "  Linux: sudo apt-get install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/"
    exit 1
fi

SOURCE_ICON="$1"
OUTPUT_DIR="public/icons"

# Check if source file exists
if [ ! -f "$SOURCE_ICON" ]; then
    echo "Error: Source icon file not found: $SOURCE_ICON"
    exit 1
fi

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick not found. Please install it first."
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "Generating icons from $SOURCE_ICON..."

# Generate all required sizes
convert "$SOURCE_ICON" -resize 72x72 "$OUTPUT_DIR/icon-72x72.png"
convert "$SOURCE_ICON" -resize 96x96 "$OUTPUT_DIR/icon-96x96.png"
convert "$SOURCE_ICON" -resize 128x128 "$OUTPUT_DIR/icon-128x128.png"
convert "$SOURCE_ICON" -resize 144x144 "$OUTPUT_DIR/icon-144x144.png"
convert "$SOURCE_ICON" -resize 152x152 "$OUTPUT_DIR/icon-152x152.png"
convert "$SOURCE_ICON" -resize 192x192 "$OUTPUT_DIR/icon-192x192.png"
convert "$SOURCE_ICON" -resize 384x384 "$OUTPUT_DIR/icon-384x384.png"
cp "$SOURCE_ICON" "$OUTPUT_DIR/icon-512x512.png"

echo "✅ Icons generated successfully in $OUTPUT_DIR/"
echo ""
echo "Icon sizes created:"
ls -lh "$OUTPUT_DIR"/*.png

