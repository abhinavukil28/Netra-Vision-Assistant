#!/bin/bash

# Script to copy PWA icons from downloaded folder to public/icons/

if [ -z "$1" ]; then
    echo "Usage: ./scripts/copy-icons.sh /path/to/your/icons/folder"
    echo ""
    echo "Example:"
    echo "  ./scripts/copy-icons.sh ~/Downloads/pwa-icons"
    echo "  ./scripts/copy-icons.sh ~/Downloads/icon-pack"
    exit 1
fi

SOURCE_FOLDER="$1"
DEST_FOLDER="public/icons"

# Check if source folder exists
if [ ! -d "$SOURCE_FOLDER" ]; then
    echo "❌ Error: Folder not found: $SOURCE_FOLDER"
    exit 1
fi

# Create destination folder if it doesn't exist
mkdir -p "$DEST_FOLDER"

echo "📁 Copying icons from: $SOURCE_FOLDER"
echo "📁 To: $DEST_FOLDER"
echo ""

# Copy all PNG files that match icon naming patterns
# Look for files like: icon-72x72.png, 72x72.png, icon_72.png, etc.
copied=0

for file in "$SOURCE_FOLDER"/*.png "$SOURCE_FOLDER"/*.PNG; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        
        # Try to extract size from filename (e.g., icon-72x72.png -> 72x72)
        if [[ $filename =~ ([0-9]+)x([0-9]+) ]]; then
            size="${BASH_REMATCH[1]}x${BASH_REMATCH[2]}"
            dest_file="$DEST_FOLDER/icon-$size.png"
            cp "$file" "$dest_file"
            echo "✅ Copied: $filename -> icon-$size.png"
            ((copied++))
        elif [[ $filename =~ icon.*\.png ]]; then
            # If it already has icon in the name, copy as-is
            dest_file="$DEST_FOLDER/$filename"
            cp "$file" "$dest_file"
            echo "✅ Copied: $filename"
            ((copied++))
        else
            # Try to rename based on common patterns
            echo "⚠️  Skipped (unrecognized pattern): $filename"
        fi
    fi
done

if [ $copied -eq 0 ]; then
    echo ""
    echo "❌ No icons were copied. Please check:"
    echo "   1. The folder contains PNG files"
    echo "   2. Files are named with size patterns (e.g., 72x72, icon-192x192)"
    echo ""
    echo "You can also manually copy files:"
    echo "  cp \"$SOURCE_FOLDER\"/*.png \"$DEST_FOLDER/\""
else
    echo ""
    echo "✨ Successfully copied $copied icon(s)!"
    echo ""
    echo "Verifying icons..."
    ls -lh "$DEST_FOLDER"/*.png 2>/dev/null | wc -l | xargs echo "Total icons in public/icons/:"
    echo ""
    echo "Required icon sizes:"
    echo "  ✓ icon-72x72.png"
    echo "  ✓ icon-96x96.png"
    echo "  ✓ icon-128x128.png"
    echo "  ✓ icon-144x144.png"
    echo "  ✓ icon-152x152.png"
    echo "  ✓ icon-192x192.png"
    echo "  ✓ icon-384x384.png"
    echo "  ✓ icon-512x512.png"
fi

