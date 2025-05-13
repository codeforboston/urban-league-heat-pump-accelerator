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

export const buildDataFromSurveyAnswers = (surveyAnswers = []) =>
  surveyAnswers.reduce((data, curr) => {
    data[curr.survey_question_id] = curr.answers;
    return data;
  }, {});

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
