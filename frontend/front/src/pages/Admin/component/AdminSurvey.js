import React from "react";
import SurveyComponent from "../../../components/SurveyComponent/SurveyComponent";

export const AdminSurvey = (props) => (
  <SurveyComponent {...props} isEditable={true} formSpacing={2} />
);
