import React, { forwardRef } from "react";
import { SurveyComponent } from "../../../components/SurveyComponent/SurveyComponent";

export const SURVEYOR_SURVEY_ID = "2";
export const SurveyorSurvey = forwardRef((props, ref) => (
  <SurveyComponent
    {...props}
    surveyId={SURVEYOR_SURVEY_ID}
    formSpacing={2}
    ref={ref}
  />
));
