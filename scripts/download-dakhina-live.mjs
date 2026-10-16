import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('scripts/dakhina-home.html', 'utf8');
const uploads = html.match(/https?:\/\/[^\s"'<>]+\/wp-content\/uploads\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi) || [];
const unique = Array.from(new Set(uploads));

console.log('Unique uploads count:', unique.length);

const outDir = 'public/assets/dakhina-live';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function downloadAll() {
  for (const url of unique) {
    try {
      const filename = path.basename(url.split('?')[0]);
      const dest = path.join(outDir, filename);
      if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
        console.log('Already have:', filename);
        continue;
      }
      console.log('Downloading:', url);
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) {
        console.log('Failed:', res.status, url);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log('Saved:', filename, buffer.length, 'bytes');
    } catch (e) {
      console.error('Error on', url, e.message);
    }
  }
  console.log('Done downloading all live Dakhina assets!');
}

downloadAll();
