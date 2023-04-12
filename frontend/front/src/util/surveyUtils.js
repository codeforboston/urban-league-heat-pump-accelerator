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
