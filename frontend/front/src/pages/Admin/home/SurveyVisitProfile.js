import { Container, Typography } from "@mui/material";
import React, { useMemo } from "react";
import {
  useGetHomeQuery,
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

  const { data: houseData, error: houseError } = useGetHomeQuery(
    surveyVisit?.home_id,
    { skip: !surveyVisit }
  );

  const { data: { survey_questions: surveyQuestions } = {} } =
    useGetSurveyStructureQuery(surveyVisit?.survey_response?.survey_id, {
      skip: !surveyVisit,
    });

  const title = useMemo(
    () =>
      surveyVisit && houseData ? `${houseToString(houseData)}` : "Loading...",
    [houseData, surveyVisit]
  );

  const completedTime = useMemo(
    () =>
      surveyVisit && houseData
        ? `Completed at: ${formatISODate(surveyVisit.created_at)}`
        : "Loading...",
    [houseData, surveyVisit]
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
      {surveyVisit && houseData ? (
        <AdminSurvey
          defaultData={surveyAnswers}
          activeHome={houseData}
          surveyId={surveyVisit.survey_response.survey_id}
          readOnly
        />
      ) : surveyVisitError || houseError ? (
        <SurveyError />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default SurveyProfile;
