import { Container, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import {
  useDeleteSurveyVisitMutation,
  useGetHomeQuery,
  useGetSurveyAnswersQuery,
  useGetSurveyResponseQuery,
  useGetSurveyVisitQuery,
  useUpdateSurveyVisitMutation,
} from "../../../api/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

import { AdminSurvey } from "../component/AdminSurvey";
import Loader from "../../../components/Loader";
import { SurveyError } from "../survey/SurveyError";
import { formatISODate } from "../../../components/DateUtils";
import { houseToString } from "../../../components/AddressUtils";

const SurveyProfile = () => {
  const navigate = useNavigate();
  const { uid: surveyVisitId } = useParams();

  const { data: surveyVisit, error: surveyVisitError } =
    useGetSurveyVisitQuery(surveyVisitId);
  // console.log({ surveyVisit });

  const { data: houseData, error: houseError } = useGetHomeQuery(
    surveyVisit?.home_id,
    { skip: !surveyVisit }
  );
  // console.log({ houseData });

  const { data: surveyResponse, error: surveyResponseError } =
    useGetSurveyResponseQuery(surveyVisit?.id, { skip: !surveyVisit });
  // console.log({ surveyResponse });
  // survey_id

  const { data: allAnswers, error: allanswersError } = useGetSurveyAnswersQuery(
    { skip: !surveyResponse }
  );
  // console.log({ allAnswers });
  const surveyAnswers = allAnswers?.filter(
    (answer) => answer.survey_response_id === surveyResponse?.id
  );
  // console.log({ surveyAnswers });

  const [
    putSurveyVisit,
    { isLoading: isSurveyVisitPutLoading, isError: isSurveyVisitPutError },
  ] = useUpdateSurveyVisitMutation();
  const [
    deleteSurveyVisit,
    { isLoading: isSurveyDeleteLoading, isError: isSurveyVisitDeleteError },
  ] = useDeleteSurveyVisitMutation();

  const title = useMemo(
    () =>
      surveyVisit && houseData
        ? `${houseToString(houseData)} ${formatISODate(surveyVisit.date)}`
        : "Loading...",
    [houseData, surveyVisit]
  );

  const onSubmit = useCallback(
    async (responses, surveyId) => {
      return await putSurveyVisit({
        id: surveyVisitId,
        body: {
          responses,
          surveyId,
          homeId: surveyVisit?.homeId,
          // TODO: probably remove this and handle on the back end
          date: new Date().toISOString(),
        },
      });
    },
    [putSurveyVisit, surveyVisit?.homeId, surveyVisitId]
  );

  const onDelete = useCallback(() => {
    deleteSurveyVisit(surveyVisitId);
    navigate("/admin/survey");
  }, [deleteSurveyVisit, surveyVisitId, navigate]);

  return (
    <Container>
      <Typography variant="h5" mt={2}>
        {title}
      </Typography>
      {surveyVisit && houseData ? (
        <AdminSurvey
          defaultData={surveyAnswers}
          activeHome={houseData}
          surveyId={surveyVisit.id}
          submitSurvey={onSubmit}
          onDelete={onDelete}
          isLoading={isSurveyVisitPutLoading || isSurveyDeleteLoading}
          isErrorSurvey={isSurveyVisitPutError || isSurveyVisitDeleteError}
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
