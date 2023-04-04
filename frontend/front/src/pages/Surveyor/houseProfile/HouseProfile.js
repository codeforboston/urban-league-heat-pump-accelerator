import {
  Alert,
  Box,
  Container,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import React, { useCallback } from "react";
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
    data: homeData,
    error: homesError,
    isLoading: isHomesLoading,
  } = useGetHomeDataQuery(homeId);

  const [
    addSurveyVisit,
    {
      isLoading: isSurveyVisitLoading,
      error: surveyVisitError,
      isSuccess: isSurveyVisitSuccess,
      data: surveyVisitData,
    },
  ] = usePostSurveyVisitMutation();

  const submitSurvey = useCallback(
    (responses, surveyId) => {
      addSurveyVisit({
        responses,
        homeId,
        surveyId,
        // TODO: probably remove this and handle on the back end
        date: new Date().toISOString(),
      });
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
