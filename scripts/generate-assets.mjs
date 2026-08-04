// One-shot generator for favicon/OG/PWA images. Outputs are committed;
// re-run only when the branding changes: node scripts/generate-assets.mjs
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFile } from 'node:fs/promises';

const paper = '#FAF8F5';
const ink = '#1C1B1A';
const accent = '#C2410C';

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="${accent}"/>
  <text x="50" y="67" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="${paper}" text-anchor="middle">AM</text>
</svg>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${paper}"/>
  <rect width="20" height="630" fill="${accent}"/>
  <text x="96" y="310" font-family="Georgia, serif" font-size="84" font-weight="bold" fill="${ink}">Alejandro Mayol</text>
  <text x="96" y="390" font-family="Helvetica, Arial, sans-serif" font-size="40" fill="${accent}">Senior Product Engineer</text>
  <text x="96" y="546" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${ink}" opacity="0.55">alexmayol.com</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile('public/og.png');
await writeFile('public/favicon.svg', iconSvg);

for (const [file, size] of [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
]) {
  await sharp(Buffer.from(iconSvg), { density: 300 }).resize(size, size).png().toFile(`public/${file}`);
}

const png32 = await sharp(Buffer.from(iconSvg), { density: 300 }).resize(32, 32).png().toBuffer();
await writeFile('public/favicon.ico', await pngToIco([png32]));

console.log('assets written to public/');
