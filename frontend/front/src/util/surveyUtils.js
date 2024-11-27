// Current supported survey languages
const supportedLanguages = ["en-US"];

export const validateLanguage = () => {
  const langPref = localStorage.getItem("langPref");
  if (typeof langPref !== "string") {
    return "en-US";
  }
  return supportedLanguages.includes(langPref) ? langPref : "en-US";
};

export const buildSurveyCacheKey = (surveyId, homeId) =>
  `survey${surveyId}-home${homeId}`;

export const buildDefaultDataFromSurveyStructure = (surveyStructure) =>
  surveyStructure.survey_questions.reduce(
    (prev, curr) => ({
      ...prev,
      [`${curr.id}`]: "",
    }),
    {}
  );
export const buildDataFromSurveyAnswers = (
  surveyAnswers = [],
  numberOfQuestions = 0
) => {
  const data = {};

  for (let i = 1; i <= numberOfQuestions; i++) {
    data[i] = "";
  }

  surveyAnswers.forEach((curr) => {
    data[curr.survey_question_id] = curr.answers;
  });

  return data;
};

export const buildSurveyVisitData = (
  answers,
  homeId,
  surveyId,
  surveyorId,
  surveyorPosition
) => {
  // build answers object
  const answersObject = {};
  Object.entries(answers).forEach(([key, value]) => {
    if (answers[key]) {
      answersObject[key] = {
        survey_question_id: key,
        answers: value,
      };
    }
  });
  return {
    survey_visit: {
      home_id: homeId,
      surveyor_id: surveyorId,
      latitude: surveyorPosition.latitude
        ? `${surveyorPosition.latitude.toString()}`
        : null,
      longitude: surveyorPosition.longitude
        ? `${surveyorPosition.longitude.toString()}`
        : null,
      survey_response_attributes: {
        survey_id: surveyId,
        survey_answers_attributes: answersObject,
      },
    },
  };
};

export const surveyAnswersToArray = (answers) => {
  return Object.keys(answers).reduce((acc, key) => {
    if (Array.isArray(answers[key])) {
      acc[key] = answers[key];
    } else {
      acc[key] = answers[key].trim() ? [answers[key]] : [];
    }
    return acc;
  }, {});
};

export const surveyRenderRules = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: {
    question: 4,
    answers: [
      "No - heard of them but have not considered them for either",
      "No answer - Not Available",
    ],
  },
  6: {
    question: 4,
    answers: [
      "Yes, for heating, not for cooling",
      "Yes for cooling, not for heating",
      "Yes, for both",
    ],
  },
  7: {
    question: 6,
    answers: [
      "Basic research & Looked at a website",
      "Decided on a plan",
      "Contacted installers & Got quotes",
      "Other",
    ],
  },
  8: null,
  9: { question: 8, answers: ["Yes"] },
  10: {
    question: 9,
    answers: [
      "Talked on the phone",
      "Scheduled a Mass Save visit",
      "Had a Mass Save visit",
      "Other",
    ],
  },
  11: { question: 8, answers: ["No"] },
  12: {
    question: 11,
    answers: ["ABCD", "RISE", "Homeworks Energy", "CET", "ClearResult"],
  },
  13: null,
  14: { question: 13, answers: ["No"] },
  15: null,
  16: null,
  17: null,
  18: null,
  19: null,
  20: null,
  21: null,
  22: null,
  23: null,
  24: null,
  25: null,
};
