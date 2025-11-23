// import { execSync } from "child_process";
import fs from "fs";
import fetch from 'node-fetch';

const pages = fs.readdirSync("./v1/images").filter(f => f.endsWith(".tif"));

for (const page of pages) {
  console.log(`processing ${page} with Qwen2.5-VL 🟢`);

  // Read image as base64 (safe)
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

  // const data = await res.json()
  // console.log(res.data);

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
        console.error("Error parsing JSON line:", e.message, "Line:", line);
      }
    }
  }
  console.log(fullResponse);

  // 🚀 Use Qwen vision model + input image flag
  // const requestJson = JSON.stringify({
  //   model: "qwen2.5:3b",
  //   prompt,
  //   images: [imgBase64]
  // });

  // const cmd = `printf '${requestJson.replace(/'/g, "'\\''")}' | ollama run`;
  // const result = execSync(cmd).toString();

  fs.writeFileSync(
    `./v1/qwen_output/${page}.qwen_${Date.now()}.txt`,
    fullResponse
  );

  console.log(`Parsed ${page} with Qwen2.5-VL 🟢`);
}
