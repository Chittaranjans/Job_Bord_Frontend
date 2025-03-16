const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Clean build directories
console.log("Cleaning build directories...");
['out', '.next'].forEach(dir => {
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`Cleaned ${dir}`);
    } catch (err) {
      console.log(`Warning: Could not clean ${dir}: ${err.message}`);
    }
  }
});

// Temporarily rename the API directory to avoid static export issues
const apiDir = path.join(__dirname, 'src', 'app', 'api');
const backupApiDir = path.join(__dirname, 'src', 'app', '_api_temp');

if (fs.existsSync(apiDir)) {
  console.log("Temporarily renaming API directory...");
  try {
    fs.renameSync(apiDir, backupApiDir);
    console.log("API directory renamed successfully");
  } catch (err) {
    console.error("Error renaming API directory:", err);
    process.exit(1);
  }
}

// Run the Next.js build
try {
  console.log("Running Next.js build...");
  execSync('next build', { stdio: 'inherit' });
  console.log("Build completed successfully");
} catch (err) {
  console.error("Build failed:", err);
}

// Restore the API directory
if (fs.existsSync(backupApiDir)) {
  console.log("Restoring API directory...");
  try {
    fs.renameSync(backupApiDir, apiDir);
    console.log("API directory restored");
  } catch (err) {
    console.error("Error restoring API directory:", err);
  }
}

console.log("Build process completed");