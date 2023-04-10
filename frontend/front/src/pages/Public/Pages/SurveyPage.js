import React, { useCallback, useMemo } from "react";
import { Alert, Container, Snackbar, Stack } from "@mui/material";
import { AddressValidatorComponent } from "../Components/AddressValidatorComponent";
import {
  useCreateHomeDataMutation,
  usePostSurveyVisitMutation,
} from "../../../redux/apiSlice";
import { useGetReCAPTCHAToken } from "../../../components/ReCaptcha";
import { ThanksForSubmission } from "../Components/ThanksForSubmission";
import { PublicSurvey } from "../Components/PublicSurvey";
import { HeatPumpSlide } from "../../../components/HeatPumpSlide";
import { HeatPumpFade } from "../../../components/HeatPumpFade";

const STEP_ADDRESS = "PHASE_ADDRESS";
const STEP_SURVEY = "PHASE_SURVEY";
const STEP_THANKS = "PHASE_THANKS";

/*
 * Page that handles the lifecycle of the public survey process
 * Verify address -> display survey -> display thank you
 * This page should handle all API calls so that component switching is easier to control
 */
export const SurveyPage = () => {
  const getReCaptchaToken = useGetReCAPTCHAToken("submit");

  const [
    createHome,
    {
      data: createHomeData,
      error: createHomeError,
      isLoading: isCreateHomeLoading,
    },
  ] = useCreateHomeDataMutation();

  const [
    addSurveyVisit,
    {
      isLoading: isSurveyVisitLoading,
      error: surveyVisitError,
      isSuccess: isSurveyVisitSuccess,
    },
  ] = usePostSurveyVisitMutation();

  const handleCreateHome = useCallback(
    async ({ address }) => {
      const recaptcha = await getReCaptchaToken();
      createHome({ ...address, recaptcha });
    },
    [createHome, getReCaptchaToken]
  );

  const handleAddSurveyVisit = useCallback(
    async (responses, surveyId) => {
      const recaptcha = await getReCaptchaToken();
      addSurveyVisit({
        responses,
        recaptcha,
        surveyId,
        homeId: createHomeData?.id,
        // TODO: probably remove this and handle on the back end
        date: new Date().toISOString(),
      });
    },
    [addSurveyVisit, createHomeData?.id, getReCaptchaToken]
  );

  const step = useMemo(() => {
    if (!createHomeData && !isSurveyVisitSuccess) {
      return STEP_ADDRESS;
    } else if (isSurveyVisitSuccess) {
      return STEP_THANKS;
    }
    return STEP_SURVEY;
  }, [createHomeData, isSurveyVisitSuccess]);

  return (
    <Container>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <h1>TAKE THE SURVEY</h1>
        <p>
          Fill out this form to record your interest in installing a heat pump
          for your home.
        </p>
        <p>
          An ULHPA representative will contact you with more information about
          the installation process.
        </p>
      </Stack>
      <HeatPumpFade show={step === STEP_ADDRESS}>
        <AddressValidatorComponent
          onValidate={handleCreateHome}
          isLoading={isCreateHomeLoading}
        />
      </HeatPumpFade>
      <HeatPumpSlide show={step === STEP_SURVEY}>
        <PublicSurvey
          submitSurvey={handleAddSurveyVisit}
          isLoading={isSurveyVisitLoading}
          activeHome={createHomeData}
        />
      </HeatPumpSlide>
      <HeatPumpSlide show={step === STEP_THANKS}>
        <ThanksForSubmission />
      </HeatPumpSlide>
      {/* TODO: this should probably be a more specific error */}
      <Snackbar open={!!createHomeError}>
        <Alert severity="info">
          {"Sorry, that address is not in our service area!"}
        </Alert>
      </Snackbar>
      <Snackbar open={!!surveyVisitError}>
        <Alert severity="error">{"Error submitting survey."}</Alert>
      </Snackbar>
    </Container>
  );
};
