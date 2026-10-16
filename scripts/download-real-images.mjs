import fs from 'fs';
import path from 'path';
import https from 'https';

const baseDir = path.resolve('public/assets/properties');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const exteriors = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1000&q=80'
];

const livings = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80'
];

const beds = [
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1540518614846-7ede433c4570?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
];

const aerials = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
];

async function run() {
  console.log('Downloading real high-res property images...');

  // Download unique 12 sets
  for (let i = 1; i <= 12; i++) {
    const extUrl = exteriors[(i - 1) % exteriors.length];
    const livingUrl = livings[(i - 1) % livings.length];
    const bedUrl = beds[(i - 1) % beds.length];
    const aerialUrl = aerials[(i - 1) % aerials.length];

    try {
      await downloadFile(extUrl, path.join(baseDir, `villa-${i}-ext.jpg`));
      await downloadFile(livingUrl, path.join(baseDir, `villa-${i}-living.jpg`));
      await downloadFile(bedUrl, path.join(baseDir, `villa-${i}-bed.jpg`));
      await downloadFile(aerialUrl, path.join(baseDir, `villa-${i}-aerial.jpg`));
      console.log(`Villa ${i} images downloaded.`);
    } catch (e) {
      console.error(`Error downloading villa ${i}:`, e.message);
    }
  }

  // Also download Dakhina Group authentic site images
  const dakhinaDir = path.resolve('public/assets');
  try {
    await downloadFile('https://dakhinagroup.com/wp-content/uploads/2023/09/dakhina.png', path.join(dakhinaDir, 'dakhina-brand.png'));
    await downloadFile('https://dakhinagroup.com/wp-content/uploads/2023/09/drel.jpg', path.join(dakhinaDir, 'drel-banner.jpg'));
    await downloadFile('https://dakhinagroup.com/wp-content/uploads/2023/09/project_work3-1024x610.jpg', path.join(dakhinaDir, 'project-work.jpg'));
    await downloadFile('https://dakhinagroup.com/wp-content/uploads/2024/06/DSCF8646-1024x768.jpg', path.join(dakhinaDir, 'site-road.jpg'));
    console.log('Dakhina Group authentic assets downloaded.');
  } catch (e) {
    console.error('Error downloading Dakhina assets:', e.message);
  }

  console.log('Done!');
}

run();
