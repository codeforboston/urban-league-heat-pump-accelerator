import SurveyComponent from "../../../components/SurveyComponent/SurveyComponent";
import { BackButton } from "./BackButton";

const SurveyorSurveyReadOnly = (props) => {
  return (
    <>
      <BackButton url="/surveyor/dashboard" description="dashboard" />
      <SurveyComponent {...props} formSpacing={2} isEditable={true} />
    </>
  );
};

export default SurveyorSurveyReadOnly;
