import fs from 'fs';
import path from 'path';

const thumbs = [
  'https://dakhinagroup.com/wp-content/uploads/2023/09/beutyfication.jpg',
  'https://dakhinagroup.com/wp-content/uploads/2023/09/beutyfication2.jpg',
  'https://dakhinagroup.com/wp-content/uploads/2023/09/beutyfication4.jpg',
  'https://dakhinagroup.com/wp-content/uploads/2023/09/slide_1.png',
  'https://dakhinagroup.com/wp-content/uploads/2023/09/slide_2.png',
  'https://dakhinagroup.com/wp-content/uploads/2023/09/slide_3.png',
  'https://dakhinagroup.com/wp-content/uploads/2023/09/slide_1.jpg',
  'https://dakhinagroup.com/wp-content/uploads/2023/09/slide_2.jpg',
  'https://dakhinagroup.com/wp-content/uploads/2023/09/slide_3.jpg',
  'https://dakhinagroup.com/wp-content/uploads/2023/09/d_gallery14.png',
  'https://dakhinagroup.com/wp-content/uploads/2024/06/DSCF8648.jpg',
  'https://dakhinagroup.com/wp-content/uploads/2024/06/DSCF8646.jpg',
  'https://dakhinagroup.com/wp-content/uploads/2024/06/DSCF8649.jpg',
  'https://dakhinagroup.com/wp-content/uploads/2023/09/60.jpg',
  'https://dakhinagroup.com/wp-content/uploads/2023/09/80.jpg',
  'https://dakhinagroup.com/wp-content/uploads/2023/09/drel.jpg',
];

const outDir = 'public/assets/dakhina-live';

async function fetchFull() {
  for (const url of thumbs) {
    try {
      const filename = path.basename(url);
      const dest = path.join(outDir, filename);
      console.log('Testing:', url);
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buffer);
        console.log('SUCCESS:', filename, buffer.length, 'bytes');
      } else {
        console.log('Status', res.status, url);
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}

fetchFull();
