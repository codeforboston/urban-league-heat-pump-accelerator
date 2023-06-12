import React, { forwardRef } from "react";
import SurveyComponent from "../../../components/SurveyComponent/SurveyComponent";

export const SURVEYOR_SURVEY_ID = "1";
export const SurveyorSurvey = forwardRef((props, ref) => (
  <div ref={ref}>
    <SurveyComponent
      {...props}
      surveyId={SURVEYOR_SURVEY_ID}
      formSpacing={2}
      ref={ref}
    />
  </div>
));
