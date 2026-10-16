import fs from 'fs';
import path from 'path';

const publicDir = 'public';

// Find all image files currently present in public/
function getPublicFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getPublicFiles(file));
    } else {
      results.push(file.replace(/\\/g, '/'));
    }
  });
  return results;
}

const existingFiles = new Set(getPublicFiles(publicDir).map(p => p.replace(/^public\//, '/')));

// Check all files in src for any referenced assets
function scanDir(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        files = files.concat(scanDir(full));
      }
    } else if (/\.(tsx|ts|jsx|js|json|html|css)$/.test(file)) {
      files.push(full);
    }
  });
  return files;
}

const allSrcFiles = scanDir('src');
const missingRefs = [];

allSrcFiles.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  // Match strings starting with /assets/
  const regex = /["'](\/assets\/[^"']+)["']/g;
  let m;
  while ((m = regex.exec(code)) !== null) {
    const ref = m[1];
    if (!existingFiles.has(ref)) {
      missingRefs.push({ file: f, ref });
    }
  }
});

console.log('Total public assets:', existingFiles.size);
console.log('Missing references count:', missingRefs.length);
if (missingRefs.length > 0) {
  console.log('Details:', JSON.stringify(missingRefs, null, 2));
}
