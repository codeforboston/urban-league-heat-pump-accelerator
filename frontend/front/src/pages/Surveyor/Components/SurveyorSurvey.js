import React from "react";
import { SurveyComponent } from "../../../components/SurveyComponent/SurveyComponent";

export const SURVEYOR_SURVEY_ID = "2";
export const SurveyorSurvey = (props) => (
  <SurveyComponent {...props} surveyId={SURVEYOR_SURVEY_ID} formSpacing={2} />
);
