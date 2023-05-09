const assignments = require("./assignments.js");
const homes = require("./homes.js");
const users = require("./users.js");
const surveys = require("./surveys.js");
const homesurvey = require("./homesurvey.js");
const property_assessments = require("./property_assessments.js");
const survey_answers = require("./survey_answers.js");
const survey_responses = require("./survey_responses.js");
const survey_questions = require("./survey_questions.js");
const survey_visits = require("./survey_visits.js");
const surveyors = require("./surveyors.js");

module.exports = () => ({
  assignments,
  homes,
  users,
  surveys,
  homesurvey,
  property_assessments,
  survey_answers,
  survey_responses,
  survey_questions,
  survey_visits,
  surveyors,
});
