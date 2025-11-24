/**
 * using tesseract.js to interact to interact with Tesseract ( c++ package ) which must be installed in the system
 * see the README.md for installation of the Tesseract ( c++ package ). 
 * 
 * WORKING OF THIS SCRIPT
 * this is a fairly simple script its job is to read the .png or .tif image files
 * and to convert them to raw kannada text ( box like strings )
 * 
 */

import Tesseract from 'tesseract.js';
import sharp from 'sharp'; // use this lib to increase the resolution of the image
import fs from 'fs';
import path from 'path';

const dir = './v1/images';
const outputDir = './v1/output';
fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const imagePath = path.join(dir, file);
//   const processedPath = path.join(dir, 'processed-' + file);

  // 🧩 Image preprocessing
//   await sharp(imagePath)
    // .grayscale()
    // .modulate({ brightness: 1, contrast: 2 }) // boost contrast
    // .threshold(140)       // adjust contrast threshold
    // .toFile(processedPath);

//   console.log(`🧼 Preprocessed: ${processedPath}`);

  // 🧠 Kannada OCR
  const { data: { text } } = await Tesseract.recognize(imagePath, 'kan');

  fs.writeFileSync(`${outputDir}/${file}.txt`, text);
  console.log(`✅ Kannada text extracted from ${file}`);
}
