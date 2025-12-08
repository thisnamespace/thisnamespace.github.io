#!/usr/bin/env node

import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const outputDir = './public';

// Favicon sizes for different platforms
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' }, // Apple touch icon
  { size: 192, name: 'android-chrome-192x192.png' }, // Android chrome
  { size: 512, name: 'android-chrome-512x512.png' }, // Android chrome large
];

// Create SVG buffer for the favicon
const createFaviconSvg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="102.4" fill="#06b6d4"/>
  <text
    x="256"
    y="370"
    text-anchor="middle"
    fill="#ffffff"
    font-family="monospace"
    font-size="280"
    font-weight="bold"
  >{}</text>
</svg>
`;

async function generateFavicons() {
  console.log('🎨 Generating favicons...\n');

  try {
    // Ensure output directory exists
    await mkdir(outputDir, { recursive: true });

    // Generate each size
    for (const { size, name } of sizes) {
      const svgBuffer = Buffer.from(createFaviconSvg(512));
      const outputPath = join(outputDir, name);

      console.log(`📐 Generating ${name} (${size}x${size})...`);

      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png({
          quality: 100,
          compressionLevel: 9,
        })
        .toFile(outputPath);

      console.log(`✅ Created: ${name}`);
    }

    // Generate favicon.ico (multi-size ICO file)
    console.log('\n📦 Generating favicon.ico (16x16, 32x32, 48x48)...');
    const svgBuffer = Buffer.from(createFaviconSvg(512));

    // Generate 32x32 as the main favicon.ico
    await sharp(svgBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(join(outputDir, 'favicon.ico'));

    console.log('✅ Created: favicon.ico');

    console.log('\n🎉 Favicon generation complete!');
    console.log(`📊 Generated ${sizes.length + 1} favicon files`);
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
