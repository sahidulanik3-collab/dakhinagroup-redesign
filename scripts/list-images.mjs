import fs from 'fs';

const html = fs.readFileSync('scripts/dakhina-home.html', 'utf8');
const regex = /https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi;
const allUrls = html.match(regex) || [];
const unique = Array.from(new Set(allUrls));

console.log('All unique image URLs:');
unique.forEach(u => console.log(u));
