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
export const buildDataFromSurveyAnswers = (surveyAnswers) =>
  surveyAnswers.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.survey_question_id]: curr.answer,
    }),
    {}
  );

export const buildSurveyVisitData = (answers, homeId, surveyId, surveyorId) => {
  // build answers object
  const answersObject = {};
  Object.entries(answers).forEach(([key, value]) => {
    answersObject[key] = {
      survey_question_id: key,
      answer: value,
    };
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
