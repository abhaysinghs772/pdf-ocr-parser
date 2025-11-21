import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = './images';
const outputDir = './output';
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
