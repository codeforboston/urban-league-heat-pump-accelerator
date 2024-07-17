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
    data[curr.survey_question_id] = curr.answer;
  });

  return data;
};

export const buildSurveyVisitData = (answers, homeId, surveyId, surveyorId) => {
  // build answers object
  const answersObject = {};
  Object.entries(answers).forEach(([key, value]) => {
    if (answers[key]) {
      answersObject[key] = {
        survey_question_id: key,
        answer: value,
      };
    }
  });

  return {
    survey_visit: {
      home_id: homeId,
      surveyor_id: surveyorId,
      survey_response_attributes: {
        survey_id: surveyId,
        survey_answers_attributes: answersObject,
      },
    },
  };
};

export const surveyRenderRules = {
  1: null,
  2: { question: 1, answer: "Yes" },
  3: { question: 2, answer: "Yes" },
  4: null,
  5: { question: 4, answer: "Yes" },
  6: null,
  7: { question: 6, answer: "Yes" },
  8: { question: 6, answer: "Yes" },
  9: { question: 6, answer: "Yes" },
  10: null,
  11: { question: 10, answer: "Other" },
  12: null,
  13: { question: 12, answer: "Other" },
  14: null,
  15: { question: 14, answer: "Yes" },
  16: { question: 14, answer: "Yes" },
  17: { question: 14, answer: "Yes" },
};
