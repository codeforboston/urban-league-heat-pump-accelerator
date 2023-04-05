// Vercel deployment: https://vercel.com/docs/serverless-functions/introduction
const fs = require("fs");

const srcPath = "./src/dummyData/jsonServerData/db.js";
const destPath = "./api/db.js";

const content = fs.readFileSync(srcPath, "utf-8");
fs.writeFileSync(destPath, content);

console.log(`Copied ${srcPath} to ${destPath}`);
