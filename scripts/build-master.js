const sharp = require('sharp');
const path = require('path');

async function createMasterLogo() {
  const width = 1024;
  const height = 1024;
  
  const svgText = `
    <svg width="${width}" height="${height}">
      <style>
        .title { fill: #00D587; font-size: 160px; font-weight: 800; font-family: Arial, sans-serif; }
        .subtitle { fill: #aaaaaa; font-size: 45px; font-family: Arial, sans-serif; text-anchor: middle;}
      </style>
      <text x="180" y="580" class="title">LOG_</text>
      <text x="740" y="580" class="title">N</text>
      <text x="512" y="700" class="subtitle">Connecting Advantages</text>
    </svg>
  `;

  const iconBuffer = await sharp(path.join(__dirname, '../public/icons/circuit-o.svg'))
    .resize(135, 135)
    .toBuffer();

  const svgBuffer = Buffer.from(svgText);

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 4, g: 4, b: 6, alpha: 1 }
    }
  })
  .composite([
    {
      input: svgBuffer,
      top: 0,
      left: 0
    },
    {
      input: iconBuffer,
      top: 450,
      left: 585
    }
  ])
  .png()
  .toFile(path.join(__dirname, '../public/logo-master.png'));
  
  console.log('Master logo updated!');
}
createMasterLogo().catch(console.error);
