import React from "react";
import { SurveyComponent } from "../../../components/SurveyComponent/SurveyComponent";

const PUBLIC_SURVEY_ID = "1";

export const PublicSurvey = (props) => (
  <SurveyComponent {...props} surveyId={PUBLIC_SURVEY_ID} formSpacing={5} />
);
