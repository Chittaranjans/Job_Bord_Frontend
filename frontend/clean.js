const fs = require('fs');
const path = require('path');

// Directories to clean
const dirs = [
  path.join(__dirname, '.next'),
  path.join(__dirname, 'out')
];

// Delete directory recursively
function deleteDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  console.log(`Cleaning ${dir}...`);
  
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Successfully deleted ${dir}`);
  } catch (err) {
    console.error(`Error deleting ${dir}:`, err);
  }
}

// Clean all directories
dirs.forEach(deleteDir);