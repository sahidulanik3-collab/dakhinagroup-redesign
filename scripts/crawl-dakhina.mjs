import fs from 'fs';
import path from 'path';

async function crawl() {
  try {
    console.log('Fetching https://dakhinagroup.com/ ...');
    const res = await fetch('https://dakhinagroup.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await res.text();
    fs.writeFileSync('scripts/dakhina-home.html', html, 'utf8');
    console.log('Saved dakhina-home.html, length:', html.length);

    // Extract all image URLs
    const regex = /(?:src|href|background|url)\s*=\s*["']([^"']+\.(?:jpg|jpeg|png|webp|svg|gif))["']/gi;
    const matches = new Set();
    let m;
    while ((m = regex.exec(html)) !== null) {
      let u = m[1];
      if (u.startsWith('//')) u = 'https:' + u;
      else if (u.startsWith('/')) u = 'https://dakhinagroup.com' + u;
      else if (!u.startsWith('http')) u = 'https://dakhinagroup.com/' + u;
      matches.add(u);
    }

    console.log('Found', matches.size, 'image URLs:');
    for (const url of matches) {
      console.log('  ', url);
    }
  } catch (err) {
    console.error('Crawl failed:', err);
  }
}

crawl();
