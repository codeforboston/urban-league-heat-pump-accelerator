import {
  Alert,
  Box,
  Container,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { HeatPumpSlide } from "../../../components/HeatPumpSlide";
import { HeatPumpFade } from "../../../components/HeatPumpFade";
import {
  useGetHomeQuery,
  useCreateSurveyVisitMutation,
} from "../../../api/apiSlice";
import { SubmissionSuccess } from "../Components/SubmissionSuccess";
import { SurveyorSurvey } from "../Components/SurveyorSurvey";

const STEP_LOADING = "PHASE_LOADING";
const STEP_HOME_ERROR = "PHASE_HOME_ERROR";
const STEP_SURVEY = "PHASE_SURVEY";
const STEP_THANKS = "PHASE_THANKS";

const HouseProfile = () => {
  const { id: homeId } = useParams();
  const {
    data: homeData,
    error: homesError,
    isLoading: isHomesLoading,
  } = useGetHomeQuery(homeId);

  const [
    addSurveyVisit,
    {
      isLoading: isSurveyVisitLoading,
      error: surveyVisitError,
      isSuccess: isSurveyVisitSuccess,
      data: surveyVisitData,
    },
  ] = useCreateSurveyVisitMutation();

  const submitSurvey = useCallback(
    async (responses, surveyId) => {
      return await addSurveyVisit({
        responses,
        homeId,
        surveyId,
        // TODO: probably remove this and handle on the back end
        date: new Date().toISOString(),
      });
    },
    [addSurveyVisit, homeId]
  );

  const step = useMemo(() => {
    if (isHomesLoading) {
      return STEP_LOADING;
    } else if (!homeData) {
      return STEP_HOME_ERROR;
    } else if (isSurveyVisitSuccess) {
      return STEP_THANKS;
    }
    return STEP_SURVEY;
  }, [homeData, isHomesLoading, isSurveyVisitSuccess]);

  return (
    <Container>
      {step === STEP_LOADING && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      <HeatPumpFade show={step === STEP_HOME_ERROR}>
        <Alert
          sx={{ margin: "1em" }}
          severity="warning"
        >{`No home found with ID '${homeId}'`}</Alert>
      </HeatPumpFade>
      <HeatPumpFade show={step === STEP_SURVEY}>
        <SurveyorSurvey
          submitSurvey={submitSurvey}
          isLoading={isHomesLoading || isSurveyVisitLoading}
          activeHome={homeData}
        />
      </HeatPumpFade>
      <HeatPumpSlide show={step === STEP_THANKS}>
        <SubmissionSuccess
          surveyId={surveyVisitData?.surveyId}
          submissionId={surveyVisitData?.id}
        />
      </HeatPumpSlide>
      <Snackbar open={!!surveyVisitError}>
        <Alert severity="error">{"Error submitting survey."}</Alert>
      </Snackbar>
      <Snackbar open={!!homesError}>
        <Alert severity="error">{"Error retrieving home data."}</Alert>
      </Snackbar>
    </Container>
  );
};

export default HouseProfile;
