import React, { useCallback, useMemo } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetHomeDataQuery,
  useGetSurveyVisitQuery,
  usePutSurveyVisitMutation,
  useDeleteSurveyVisitMutation,
} from "../../../redux/apiSlice";
import { SurveyError } from "./SurveyError";
import { AdminSurvey } from "../component/AdminSurvey";
import { houseToString } from "../../../components/AddressUtils";
import { formatISODate } from "../../../components/DateUtils";

const SurveyProfile = () => {
  const navigate = useNavigate();
  const { uid: surveyVisitId } = useParams();

  const { data: surveyVisit, error: surveyVisitError } =
    useGetSurveyVisitQuery(surveyVisitId);

  const { data: houseData, error: houseError } = useGetHomeDataQuery(
    surveyVisit?.homeId,
    { skip: !surveyVisit }
  );
  const [
    putSurveyVisit,
    { isLoading: isSurveyVisitPutLoading, error: surveyVisitPutError },
  ] = usePutSurveyVisitMutation();
  const [
    deleteSurveyVisit,
    { isLoading: isSurveyDeleteLoading, error: surveyVisitDeleteError },
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
      const body = {
        responses,
        surveyId,
        homeId: surveyVisit?.homeId,
        // TODO: probably remove this and handle on the back end
        date: new Date().toISOString(),
      };
      putSurveyVisit({ id: surveyVisitId, body });
    },
    [putSurveyVisit, surveyVisit?.homeId, surveyVisitId]
  );

  const onDelete = useCallback(() => {
    deleteSurveyVisit(surveyVisitId);
    navigate("/admin/survey");
    navigate(0); // reload page to update data
  }, [deleteSurveyVisit, surveyVisitId, navigate]);

  const PageContent = useCallback(() => {
    if (surveyVisit && houseData) {
      return (
        <AdminSurvey
          defaultData={surveyVisit.responses}
          activeHome={houseData}
          surveyId={surveyVisit.surveyId}
          submitSurvey={onSubmit}
          onDelete={onDelete}
          isLoading={isSurveyVisitPutLoading || isSurveyDeleteLoading}
        />
      );
    }

    if (surveyVisitError || houseError) {
      return <SurveyError />;
    }

    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }, [
    houseData,
    houseError,
    isSurveyDeleteLoading,
    isSurveyVisitPutLoading,
    onDelete,
    onSubmit,
    surveyVisit,
    surveyVisitError,
  ]);

  return (
    <Container>
      <Typography variant="h5" mt={2}>
        {title}
      </Typography>
      <PageContent />
    </Container>
  );
};

export default SurveyProfile;
