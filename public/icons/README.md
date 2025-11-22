# App Icons

This directory should contain app icons for PWA and native app deployment.

## Required Icon Sizes

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## How to Generate Icons

1. Create or obtain a 512x512 PNG icon for your app
2. Run the icon generator script:
   ```bash
   ./scripts/generate-icons.sh path/to/your-icon-512x512.png
   ```

Or manually create icons using any image editing tool, ensuring they are square PNG files.

## Icon Design Tips

- Use a simple, recognizable design
- Ensure good contrast for visibility
- Test on both light and dark backgrounds
- Keep important elements in the center (safe area)
- Use transparent background or solid color

