import fs from 'fs';
import path from 'path';

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const p = path.join(dir, item);
    if (fs.statSync(p).isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== 'dist') {
        files = files.concat(walk(p));
      }
    } else if (/\.(tsx|ts|jsx|js|html|css|json)$/.test(item)) {
      files.push(p);
    }
  }
  return files;
}

const allFiles = walk('src');
const missing = new Set();
const imgRegex = /['"](\/assets\/[^'"]+\.(?:jpg|jpeg|png|webp|svg))['"]/g;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const rel = match[1];
    const full = path.join('public', rel.replace(/^\//, ''));
    if (!fs.existsSync(full)) {
      missing.add(`${file} -> ${rel}`);
    }
  }
}

console.log('MISSING ASSETS:');
console.log(Array.from(missing));
