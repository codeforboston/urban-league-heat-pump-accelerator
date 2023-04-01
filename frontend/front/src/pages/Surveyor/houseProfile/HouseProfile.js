import {
  Alert,
  Box,
  Container,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  useGetHomeDataQuery,
  usePostSurveyVisitMutation,
} from "../../../redux/apiSlice";
import { SubmissionSuccess } from "../Components/SubmissionSuccess";
import { SurveyorSurvey } from "../Components/SurveyorSurvey";

const HouseProfile = () => {
  const { id: homeId } = useParams();
  const {
    data: homesData,
    error: homesError,
    isLoading: isHomesLoading,
  } = useGetHomeDataQuery();

  const [
    addSurveyVisit,
    {
      isLoading: isSurveyVisitLoading,
      error: surveyVisitError,
      isSuccess: isSurveyVisitSuccess,
      data: surveyVisitData,
    },
  ] = usePostSurveyVisitMutation();

  const homeData = useMemo(
    () =>
      homeId && homesData
        ? homesData.filter((h) => `${h.id}` === `${homeId}`)[0] || null
        : null,
    [homesData, homeId]
  );

  const submitSurvey = useCallback(
    (responses, surveyId) => {
      const surveyVisit = {
        responses,
        homeId,
        surveyId,
      };
      addSurveyVisit(surveyVisit);
    },
    [addSurveyVisit, homeId]
  );

  return (
    <Container>
      {isHomesLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : homesError ? (
        <Alert sx={{ margin: "1em" }} severity="error">
          {"Error retrieving home data."}
        </Alert>
      ) : !homeData ? (
        <Alert
          sx={{ margin: "1em" }}
          severity="warning"
        >{`No home found with ID '${homeId}'`}</Alert>
      ) : isSurveyVisitSuccess ? (
        <SubmissionSuccess
          surveyId={surveyVisitData?.surveyId}
          submissionId={surveyVisitData?.id}
        />
      ) : (
        <SurveyorSurvey
          submitSurvey={submitSurvey}
          isLoading={isHomesLoading || isSurveyVisitLoading}
          activeHome={homeData}
        />
      )}
      <Snackbar open={!!surveyVisitError}>
        <Alert severity="error">{"Error submitting survey."}</Alert>
      </Snackbar>
    </Container>
  );
};

export default HouseProfile;
