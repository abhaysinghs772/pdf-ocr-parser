import { execSync } from "child_process";
import fs from "fs";

const pages = fs.readdirSync("./images").filter(f => f.endsWith(".png"));

for (const page of pages) {
  const result = execSync(`ollama run llava:7b-q4 ./images/${page} "Extract all text from this image"`).toString();
  fs.writeFileSync(`./output/${page}.llava.txt`, result);
  console.log(`Parsed ${page} ✅`);
}
