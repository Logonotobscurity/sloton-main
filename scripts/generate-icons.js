const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icons/icon-192x192.png', size: 192 },
  { name: 'icons/icon-512x512.png', size: 512 },
];

const masterLogo = path.join(__dirname, '../public/logo-master.png');

// Create icons directory
if (!fs.existsSync(path.join(__dirname, '../public/icons'))) {
  fs.mkdirSync(path.join(__dirname, '../public/icons'), { recursive: true });
}

// Generate all sizes
sizes.forEach(({ name, size }) => {
  sharp(masterLogo)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 213, b: 135, alpha: 1 }
    })
    .toFile(path.join(__dirname, '../public', name))
    .then(() => console.log(`✓ Generated ${name}`))
    .catch(err => console.error(`✗ Error generating ${name}:`, err));
});

// Generate OG image
sharp(masterLogo)
  .resize(500, 500) // Scale down to fit inside 630
  .toBuffer()
  .then((resizedMasterBuffer) => {
      return sharp({
        create: {
          width: 1200,
          height: 630,
          channels: 4,
          background: { r: 0, g: 213, b: 135, alpha: 1 }
        }
      })
      .composite([
        {
          input: resizedMasterBuffer,
          gravity: 'center'
        }
      ])
      .toFile(path.join(__dirname, '../public/og-image.png'));
  })
  .then(() => console.log('✓ Generated og-image.png'))
  .catch(err => console.error('✗ Error generating OG image:', err));
