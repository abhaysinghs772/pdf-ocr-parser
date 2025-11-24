/**
 * WORKING OF THIS SCRIPT
 * 
 * Once the raw Kannada text is extracted then run this script to transform 
 * the box like non-readable strings to english readable string
 * 
 */

import fs from "fs";
import fetch from 'node-fetch';

const pages = fs.readdirSync("./v1/images").filter(f => f.endsWith(".tif"));

for (const page of pages) {
  // I am using Qwen2.5 which gives me 100 % cpu utilization and 33% accuracy ( speed of this model is satisfactory )
  // but one can also use Qwen2.5-vl for more accuracy
  // 
  console.log(`processing ${page} with Qwen2.5 🟢`);

  // Read extracted texts ( box like texts )
  const parsedText = fs.readFileSync(`./v1/output/${page.split('.tif').join('.png.txt')}`, {
    encoding: "utf8"
  });

  const payload = {
    model: "qwen2.5:3b",
    prompt: `
      Extract all readable Kannada text from the text provide at the end of this prompt.
      Fix OCR errors.
      Output clean, plain text only.
      ${parsedText}
    `.trim(), 
  };

  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  let fullResponse = '';

  for await (const chunk of res.body) {
    const lines = chunk.toString().split('\n');
            
    for (const line of lines) {
      if (line.trim() === '') continue; // Skip empty lines

      try {
        const data = JSON.parse(line);
        
        // The actual generated text is in the 'response' field
        if (data.response) {
            fullResponse += data.response;
        }

        // The last chunk contains the 'done' flag
        if (data.done) {
          break; // Exit the loop when streaming is complete
        }
      } catch (e) {
        // This handles lines that might not be clean JSON (rare, but good practice)
        throw new Error("Error parsing JSON line:", e.message, "Line:", line);
      }
    }
  }

  fs.writeFileSync(
    `./v1/qwen_output/${page}.qwen_${Date.now()}.txt`,
    fullResponse
  );

  console.log(`Parsed ${page} with Qwen2.5-VL 🟢`);
}
