# Icon Setup Guide

## Option 1: Using ImageMagick (Recommended)

### Step 1: Install ImageMagick

**macOS:**
```bash
brew install imagemagick
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install imagemagick
```

**Windows:**
Download from: https://imagemagick.org/script/download.php

### Step 2: Place Your Icon

Copy your 512x512 PNG icon to the project root, for example:
- `icon.png` or
- `icon-512x512.png` or
- `netra-icon.png`

### Step 3: Generate All Icons

Run the icon generation script:
```bash
./scripts/generate-icons.sh path/to/your-icon.png
```

Or use the Node.js script:
```bash
node scripts/setup-icon.js path/to/your-icon.png
```

---

## Option 2: Manual Setup (No ImageMagick)

### Step 1: Copy Your Icon

Place your 512x512 PNG icon directly in `public/icons/`:
```bash
cp your-icon.png public/icons/icon-512x512.png
```

### Step 2: Create Other Sizes

You can use any image editor or online tool to create the other sizes:

Required sizes:
- `icon-72x72.png` (72x72 pixels)
- `icon-96x96.png` (96x96 pixels)
- `icon-128x128.png` (128x128 pixels)
- `icon-144x144.png` (144x144 pixels)
- `icon-152x152.png` (152x152 pixels)
- `icon-192x192.png` (192x192 pixels)
- `icon-384x384.png` (384x384 pixels)
- `icon-512x512.png` (512x512 pixels - your original)

### Online Tools for Resizing:
- https://www.iloveimg.com/resize-image
- https://www.resizepixel.com/
- https://imageresizer.com/

---

## Option 3: Using Online PWA Icon Generator

1. Go to: https://www.pwabuilder.com/imageGenerator
2. Upload your 512x512 icon
3. Download the generated icons
4. Extract and copy all icons to `public/icons/`

---

## Verify Icons Are Set Up

After setting up icons, verify they exist:
```bash
ls -la public/icons/*.png
```

You should see all 8 icon files listed.

---

## Next Steps

Once icons are set up:
1. Build your app: `npm run build`
2. Test locally: `npm run preview`
3. Deploy to hosting service
4. Test PWA installation on mobile device

