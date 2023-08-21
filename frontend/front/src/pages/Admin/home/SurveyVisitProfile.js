import { Container, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import {
  useDeleteSurveyVisitMutation,
  useGetHomeQuery,
  useGetSurveyVisitQuery,
  useUpdateSurveyVisitMutation,
} from "../../../api/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

import { AdminSurvey } from "../component/AdminSurvey";
import Loader from "../../../components/Loader";
import { SurveyError } from "../survey/SurveyError";
import { formatISODate } from "../../../components/DateUtils";
import { houseToString } from "../../../components/AddressUtils";
import { withAdminPrefix, ADMIN_SURVEY } from "../../../routing/routes";

const SurveyProfile = () => {
  const navigate = useNavigate();
  const { uid: surveyVisitId } = useParams();
  const { data: surveyVisit, error: surveyVisitError } =
    useGetSurveyVisitQuery(surveyVisitId);

  const { data: houseData, error: houseError } = useGetHomeQuery(
    surveyVisit?.home_id,
    { skip: !surveyVisit }
  );

  const surveyAnswers = surveyVisit?.survey_response?.survey_answers;

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
    navigate(withAdminPrefix(ADMIN_SURVEY));
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
