import React, { forwardRef } from "react";
import SurveyComponent from "../../../components/SurveyComponent/SurveyComponent";
import { BackButton } from "./BackButton";

export const SURVEYOR_SURVEY_ID = "1";
export const SurveyorSurvey = forwardRef((props, ref) => (
  <>
    <BackButton url="/surveyor/dashboard" description="dashboard" />
    <SurveyComponent
      {...props}
      surveyId={SURVEYOR_SURVEY_ID}
      formSpacing={2}
      ref={ref}
    />
  </>
));
