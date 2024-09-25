import { Container, Typography } from "@mui/material";
import React, { useMemo } from "react";
import {
  useGetSurveyStructureQuery,
  useGetSurveyVisitQuery,
} from "../../../api/apiSlice";
import { useParams } from "react-router-dom";
import { AdminSurvey } from "../component/AdminSurvey";
import Loader from "../../../components/Loader";
import { SurveyError } from "../survey/SurveyError";
import { formatISODate } from "../../../components/DateUtils";
import { houseToString } from "../../../components/AddressUtils";
import { buildDataFromSurveyAnswers } from "../../../util/surveyUtils";

const SurveyProfile = () => {
  const { uid: surveyVisitId } = useParams();

  const { data: surveyVisit, error: surveyVisitError } =
    useGetSurveyVisitQuery(surveyVisitId);

  const { data: { survey_questions: surveyQuestions } = {} } =
    useGetSurveyStructureQuery(surveyVisit?.survey_response?.survey_id, {
      skip: !surveyVisit,
    });

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
            surveyVisit?.survey_response?.survey_answers,
            surveyQuestions?.length
          )
        : [],
    [surveyVisit, surveyQuestions]
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
        <AdminSurvey
          defaultData={surveyAnswers}
          activeHome={surveyVisit.home}
          surveyId={surveyVisit.survey_response.survey_id}
          readOnly
        />
      ) : surveyVisitError ? (
        <SurveyError />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default SurveyProfile;
