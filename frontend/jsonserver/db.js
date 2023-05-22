const assignments = require("./data/assignments_index.json");
const homes = require("./data/homes.js");
const users = require("./data/users.js");
const surveys = require("./data/survey_index.json");
const homesurvey = require("./data/homesurvey.js");
const property_assessments = require("./data/property_assessments.js");
const survey_answers = require("./data/survey_answers.js");
const survey_responses = require("./data/survey_responses.js");
const survey_questions = require("./data/survey_questions.js");
const survey_visits = require("./data/survey_visits.js");
const surveyors = require("./data/surveyors_index.json");

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
