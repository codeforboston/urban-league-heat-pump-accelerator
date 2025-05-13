import { Container, Typography } from "@mui/material";
import { useMemo } from "react";
import { useGetSurveyVisitQuery } from "../../api/apiSlice";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { SurveyError } from "./SurveyStructureError";
import { formatISODate } from "../DateUtils";
import { houseToString } from "../AddressUtils";
import { buildDataFromSurveyAnswers } from "../../util/surveyUtils";

const SurveyProfile = ({ renderSurvey }) => {
  const { uid: surveyVisitId } = useParams();

  const { data: surveyVisit, error: surveyVisitError } =
    useGetSurveyVisitQuery(surveyVisitId);

  const title = useMemo(
    () => (surveyVisit ? `${houseToString(surveyVisit.home)}` : "Loading..."),
    [surveyVisit]
  );

  const completedTime = useMemo(
    () =>
      surveyVisit
        ? `Completed at: ${formatISODate(surveyVisit.created_at)}`
        : "Loading...",
    [surveyVisit]
  );

  const surveyAnswers = useMemo(
    () =>
      surveyVisit?.survey_response
        ? buildDataFromSurveyAnswers(
            surveyVisit?.survey_response?.survey_answers
          )
        : [],
    [surveyVisit]
  );

  const langPref = useMemo(
    () => surveyVisit?.survey_response?.language_code || "en",
    [surveyVisit]
  );

  const surveyMode = useMemo(
    () => (surveyVisit?.surveyor_id ? "offline" : "online"),
    [surveyVisit]
  );

  return (
    <Container>
      <Typography variant="h5" mt={2}>
        {title}
      </Typography>
      <Typography variant="subtitle1" mt={2}>
        {completedTime}
      </Typography>
      {surveyVisit ? (
        renderSurvey({
          defaultData: surveyAnswers,
          activeHome: surveyVisit.home,
          surveyId: surveyVisit.survey_response.survey_id,
          readOnly: true,
          langPref,
          surveyMode,
        })
      ) : surveyVisitError ? (
        <SurveyError />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default SurveyProfile;
