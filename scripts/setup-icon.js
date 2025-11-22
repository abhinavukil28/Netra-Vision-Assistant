#!/usr/bin/env node

/**
 * Icon Setup Script
 * Generates all required PWA icons from a 512x512 source image
 * 
 * Usage: node scripts/setup-icon.js path/to/icon-512x512.png
 * 
 * This script uses Node.js built-in modules, no external dependencies required
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceIcon = process.argv[2];
const outputDir = path.join(__dirname, '../public/icons');

if (!sourceIcon) {
  console.error('❌ Error: Please provide the path to your 512x512 PNG icon');
  console.log('\nUsage: node scripts/setup-icon.js path/to/icon-512x512.png');
  process.exit(1);
}

if (!fs.existsSync(sourceIcon)) {
  console.error(`❌ Error: Icon file not found: ${sourceIcon}`);
  process.exit(1);
}

// Check if ImageMagick is available
let hasImageMagick = false;
try {
  execSync('which convert', { stdio: 'ignore' });
  hasImageMagick = true;
} catch (e) {
  try {
    execSync('which magick', { stdio: 'ignore' });
    hasImageMagick = true;
  } catch (e2) {
    // ImageMagick not found
  }
}

if (!hasImageMagick) {
  console.log('⚠️  ImageMagick not found. Installing...');
  console.log('\nPlease install ImageMagick first:');
  console.log('  macOS: brew install imagemagick');
  console.log('  Linux: sudo apt-get install imagemagick');
  console.log('  Windows: Download from https://imagemagick.org/\n');
  console.log('Or manually copy your icon to public/icons/icon-512x512.png');
  console.log('and create resized versions for other sizes.\n');
  process.exit(1);
}

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log(`📦 Generating icons from ${sourceIcon}...\n`);

sizes.forEach(size => {
  const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
  try {
    // Try 'convert' first, then 'magick'
    try {
      execSync(`convert "${sourceIcon}" -resize ${size}x${size} "${outputPath}"`, { stdio: 'ignore' });
    } catch (e) {
      execSync(`magick "${sourceIcon}" -resize ${size}x${size} "${outputPath}"`, { stdio: 'ignore' });
    }
    console.log(`✅ Created icon-${size}x${size}.png`);
  } catch (error) {
    console.error(`❌ Failed to create icon-${size}x${size}.png:`, error.message);
  }
});

console.log(`\n✨ All icons generated successfully in ${outputDir}/`);
console.log('\nNext steps:');
console.log('1. Build your app: npm run build');
console.log('2. Deploy to your hosting service');
console.log('3. Test PWA installation on mobile device\n');

