import SurveyComponent from "../../../components/SurveyComponent/SurveyComponent";

export const CompletedSurvey = (props) => (
  <SurveyComponent
    {...props}
    formSpacing={2}
    langPref="en"
    surveyMode="offline"
  />
);
