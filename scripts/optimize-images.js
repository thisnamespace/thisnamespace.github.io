#!/usr/bin/env node

import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const inputDir = './public/images/projects';
const outputDir = './public/images/projects';

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  try {
    const files = await readdir(inputDir);
    const pngFiles = files.filter(file => file.endsWith('.png'));

    for (const file of pngFiles) {
      const inputPath = join(inputDir, file);
      const outputPath = join(outputDir, file.replace('.png', '.webp'));

      console.log(`Processing: ${file}`);

      await sharp(inputPath)
        .resize(800, 600, {
          fit: 'cover',
          position: 'center',
        })
        .webp({
          quality: 85,
          effort: 6,
        })
        .toFile(outputPath);

      console.log(`✅ Created: ${file.replace('.png', '.webp')}`);
    }

    console.log('\n🎉 Image optimization complete!');
    console.log(`📊 Processed ${pngFiles.length} images`);
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();
