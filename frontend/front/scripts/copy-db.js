// Vercel deployment: https://vercel.com/docs/serverless-functions/introduction
// To access and visualize the data from the Vercel-hosted API, simply
// visit the API endpoint URLs using the Vercel deployment domain
// (e.g., https://https://bhpa.vercel.app/api/your-endpoint).
//
// Add a new script called "copy-db" to copy the contents of ./src/dummyData/jsonServerData/db.js to ./api/db.js.
// Also modified the "start" script to run "copy-db" before starting the app using react-scripts.
// This will ensure that the db.js file is copied to the right location before the app is started.

const fs = require("fs");

const srcPath = "./src/dummyData/jsonServerData/db.js";
const destPath = "./api/db.js";

const content = fs.readFileSync(srcPath, "utf-8");
fs.writeFileSync(destPath, content);

console.log(`Copied ${srcPath} to ${destPath}`);
