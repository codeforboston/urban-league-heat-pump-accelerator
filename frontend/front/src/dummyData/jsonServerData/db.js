const assignments = require("./assignments.js");
const homes = require("./homes.js");
const users = require("./users.js");
const surveys = require("./surveys.js");
const homesurvey = require("./homesurvey.js");

module.exports = () => ({
  assignments,
  homes,
  users,
  surveys,
  homesurvey,
});
