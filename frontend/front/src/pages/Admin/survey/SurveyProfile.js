import React, { useCallback, useMemo } from "react";
import { Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetHomeQuery,
  useGetSurveyVisitQuery,
  useUpdateSurveyVisitMutation,
  useDeleteSurveyVisitMutation,
} from "../../../api/apiSlice";
import { SurveyError } from "./SurveyError";
import { AdminSurvey } from "../component/AdminSurvey";
import { houseToString } from "../../../components/AddressUtils";
import { formatISODate } from "../../../components/DateUtils";
import Loader from "../../../components/Loader";

const SurveyProfile = () => {
  const navigate = useNavigate();
  const { uid: surveyVisitId } = useParams();

  const { data: surveyVisit, error: surveyVisitError } =
    useGetSurveyVisitQuery(surveyVisitId);

  const { data: houseData, error: houseError } = useGetHomeQuery(
    surveyVisit?.homeId,
    { skip: !surveyVisit }
  );
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
          defaultData={surveyVisit.responses}
          activeHome={houseData}
          surveyId={surveyVisit.surveyId}
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
