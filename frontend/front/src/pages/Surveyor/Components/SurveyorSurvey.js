import React, { forwardRef } from "react";
import SurveyComponent from "../../../components/SurveyComponent/SurveyComponent";
import { BackButton } from "./BackButton";

export const SURVEYOR_SURVEY_ID = "1";
export const SurveyorSurvey = forwardRef((props, ref) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    label: {
      fontSize: "1.25rem",
      fontWeight: 700,
      color: "#000000",
      lineHeight: "1.6",
    },
  };
  return (
    <>
      <BackButton url="/surveyor/dashboard" description="dashboard" />
      <SurveyComponent
        {...props}
        surveyId={SURVEYOR_SURVEY_ID}
        formSpacing={8}
        ref={ref}
        styles={styles}
      />
    </>
  );
});
