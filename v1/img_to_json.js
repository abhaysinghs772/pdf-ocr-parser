import fs from 'fs';
import fetch from 'node-fetch';

const text = fs.readFileSync('./output/sample-1.jpg.txt', 'utf8');
const prompt = `
Extract structured information in JSON from this document text:
${text}
`;

const res = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: 'mistral', prompt })
});

const data = await res.json();
console.log('🧩 Structured data:', data.response);
