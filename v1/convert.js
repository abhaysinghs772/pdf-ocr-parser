import { fromPath } from "pdf2pic";
import fs from "fs";
// import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

const pdfPath = "./sample.pdf";
const outputDir = "./v1/images";
fs.mkdirSync(outputDir, { recursive: true });

// Count total pages dynamically
// const pdf = await pdfjsLib.getDocument(pdfPath).promise;
// const totalPages = pdf.numPages;

const converter = fromPath(pdfPath, {
  density: 300,           // DPI
  saveFilename: "page",
  savePath: outputDir,
  format: "tif",
  width: 2000,
  height: 2000
});

(async () => {
  for (let i = 1; i <= 3; i++) {
    await converter(i);
    console.log(`✅ Converted page ${i}`);
  }
})();