import { Alert, Container, Snackbar } from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateSurveyVisitMutation,
  useGetHomeQuery,
} from "../../../api/apiSlice";

import { useSelector } from "react-redux";
import { HeatPumpFade } from "../../../components/HeatPumpFade";
import Loader from "../../../components/Loader";
import SurveyErrorDialog from "../../../components/SurveyComponent/SurveyErrorDialog";
import { selectCurrentUser } from "../../../features/login/loginSlice";
import { buildSurveyVisitData } from "../../../util/surveyUtils";
import { SurveyorSurvey } from "../Components/SurveyorSurvey";

const STEP_LOADING = "PHASE_LOADING";
const STEP_HOME_ERROR = "PHASE_HOME_ERROR";
const STEP_SURVEY = "PHASE_SURVEY";
const STEP_THANKS = "PHASE_THANKS";

const HouseProfile = () => {
  const navigate = useNavigate();
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
    },
  ] = useCreateSurveyVisitMutation();

  useEffect(() => {
    if (isSurveyVisitSuccess) {
      navigate(`/surveyor/dashboard?success=${homeId}`);
    }
  }, [homeId, isSurveyVisitSuccess, navigate]);

  const submitSurvey = useCallback(
    async (answers, surveyId, _, __, surveyorPosition) => {
      const surveyVisit = await addSurveyVisit({
        surveyVisit: buildSurveyVisitData(
          answers,
          homeId,
          surveyId,
          surveyorId,
          surveyorPosition
        ),
      });
      return surveyVisit;
    },
    [addSurveyVisit, homeId, surveyorId]
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
      <SurveyErrorDialog open={!!surveyVisitError} handleAgree={submitSurvey} />
      {!isHomeLoading && !homeData && (
        <Snackbar open={!!homeError}>
          <Alert severity="error">{"Error retrieving home data."}</Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default HouseProfile;
