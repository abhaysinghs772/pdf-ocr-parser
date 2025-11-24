/**
 * WORKING OF THIS SCRIPT
 * 
 * this is a fairly simple script its job is to read the scanned file (.pdf) for now
 * and to extract all the pages and then converting them image files for further processing 
 * 
 */

import { fromPath } from "pdf2pic";
import fs from "fs";

const pdfPath = "./sample.pdf";
const outputDir = "./v1/images";
fs.mkdirSync(outputDir, { recursive: true });

const converter = fromPath(pdfPath, {
  density: 300,           // DPI
  saveFilename: "page",
  savePath: outputDir,
  format: "tif", // can be png also but use .tif for better results
  width: 2000,
  height: 2000
});

(async () => {
  for (let i = 1; i <= 3; i++) {
    await converter(i);
    console.log(`✅ Converted page ${i}`);
  }
})();