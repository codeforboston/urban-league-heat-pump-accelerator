import React, { forwardRef } from "react";
import { Typography } from "@mui/material";
import SurveyComponent from "../../../components/SurveyComponent/SurveyComponent";

export const SURVEYOR_SURVEY_ID = "1";
export const SurveyorSurvey = forwardRef((props, ref) => (
  <>
    <Typography variant="h5" mt={2}>
      {"New Survey Response"}
    </Typography>
    <SurveyComponent
      {...props}
      surveyId={SURVEYOR_SURVEY_ID}
      formSpacing={2}
      ref={ref}
    />
  </>
));
