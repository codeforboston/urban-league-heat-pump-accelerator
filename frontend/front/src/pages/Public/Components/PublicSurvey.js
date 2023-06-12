import React, { forwardRef } from "react";
import SurveyComponent from "../../../components/SurveyComponent/SurveyComponent";

const PUBLIC_SURVEY_ID = "1";

export const PublicSurvey = forwardRef((props, ref) => (
  <div ref={ref}>
    <SurveyComponent
      {...props}
      surveyId={PUBLIC_SURVEY_ID}
      formSpacing={5}
      ref={ref}
    />
  </div>
));
