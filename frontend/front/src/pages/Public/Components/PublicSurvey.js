import React, { forwardRef } from "react";
import SurveyComponent from "../../../components/SurveyComponent/SurveyComponent";
import { useTranslation } from "react-i18next";

const PUBLIC_SURVEY_ID = "1";

export const PublicSurvey = forwardRef((props, ref) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <SurveyComponent
      {...props}
      surveyId={PUBLIC_SURVEY_ID}
      formSpacing={5}
      ref={ref}
      langPref={language}
      surveyMode="online"
    />
  );
});
