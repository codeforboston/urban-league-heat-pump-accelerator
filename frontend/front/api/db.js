// Vercel deployment: https://vercel.com/docs/serverless-functions/introduction
const assignments = require("../src/dummyData/jsonServerData/assignments.js");
const homes = require("../src/dummyData/jsonServerData/homes.js");
const users = require("../src/dummyData/jsonServerData/users.js");
const surveys = require("../src/dummyData/jsonServerData/surveys.js");
const homesurvey = require("../src/dummyData/jsonServerData/homesurvey.js");

module.exports = () => ({
  assignments,
  homes,
  users,
  surveys,
  homesurvey,
});
