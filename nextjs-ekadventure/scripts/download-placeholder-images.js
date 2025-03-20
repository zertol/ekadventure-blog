const fs = require('fs');
const https = require('https');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');

// Ensure the images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log('Created images directory:', IMAGES_DIR);
}

// Placeholder image URLs
const images = [
  {
    name: 'adventure-header.jpg',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&q=80',
    description: 'Header background image (mountain landscape)',
  },
  {
    name: 'profile-avatar.jpg',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop&q=80',
    description: 'Profile avatar (person)',
  },
];

// Download each image
images.forEach((image) => {
  const filePath = path.join(IMAGES_DIR, image.name);

  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`File already exists: ${image.name}`);
    return;
  }

  console.log(`Downloading ${image.name} (${image.description})...`);

  const file = fs.createWriteStream(filePath);

  https
    .get(image.url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${image.name}`);
      });
    })
    .on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      console.error(`Error downloading ${image.name}:`, err.message);
    });
});

console.log('Download process initiated. Please wait for completion messages.');
