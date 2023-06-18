import { Alert, Container, Snackbar } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { HeatPumpSlide } from "../../../components/HeatPumpSlide";
import { HeatPumpFade } from "../../../components/HeatPumpFade";
import {
  useGetHomeQuery,
  useCreateSurveyVisitMutation,
} from "../../../api/apiSlice";
import { SubmissionSuccess } from "../Components/SubmissionSuccess";
import {
  SURVEYOR_SURVEY_ID,
  SurveyorSurvey,
} from "../Components/SurveyorSurvey";
import Loader from "../../../components/Loader";
import { buildSurveyVisitData } from "../../../util/surveyUtils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/login/loginSlice";

const STEP_LOADING = "PHASE_LOADING";
const STEP_HOME_ERROR = "PHASE_HOME_ERROR";
const STEP_SURVEY = "PHASE_SURVEY";
const STEP_THANKS = "PHASE_THANKS";

const HouseProfile = () => {
  const { id: homeId } = useParams();
  const { id: surveyorId } = useSelector(selectCurrentUser);

  const {
    data: homeData,
    error: homeError,
    isLoading: isHomeLoading,
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
    async (answers, surveyId) => {
      const surveyVisit = await addSurveyVisit({
        surveyVisit: buildSurveyVisitData(
          answers,
          homeId,
          surveyId,
          surveyorId
        ),
      });
      return surveyVisit;
    },
    [addSurveyVisit, homeId]
  );

  const step = useMemo(() => {
    if (isHomeLoading) {
      return STEP_LOADING;
    } else if (!homeData) {
      return STEP_HOME_ERROR;
    } else if (isSurveyVisitSuccess) {
      return STEP_THANKS;
    }
    return STEP_SURVEY;
  }, [homeData, isHomeLoading, isSurveyVisitSuccess]);

  return (
    <Container>
      {step === STEP_LOADING && <Loader />}
      <HeatPumpFade show={step === STEP_HOME_ERROR}>
        <Alert
          sx={{ margin: "1em" }}
          severity="warning"
        >{`No home found with ID '${homeId}'`}</Alert>
      </HeatPumpFade>
      <HeatPumpFade show={step === STEP_SURVEY}>
        <SurveyorSurvey
          submitSurvey={submitSurvey}
          isLoading={isHomeLoading || isSurveyVisitLoading}
          activeHome={homeData}
        />
      </HeatPumpFade>
      <HeatPumpSlide show={step === STEP_THANKS}>
        <SubmissionSuccess
          surveyId={SURVEYOR_SURVEY_ID}
          submissionId={surveyVisitData?.id}
        />
      </HeatPumpSlide>
      <Snackbar open={!!surveyVisitError}>
        <Alert severity="error">{"Error submitting survey."}</Alert>
      </Snackbar>
      <Snackbar open={!!homeError}>
        <Alert severity="error">{"Error retrieving home data."}</Alert>
      </Snackbar>
    </Container>
  );
};

export default HouseProfile;
