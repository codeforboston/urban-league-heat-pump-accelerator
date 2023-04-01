import React, { useCallback } from "react";
import { Alert, Container, Snackbar, Stack } from "@mui/material";
import { AddressValidatorComponent } from "../Components/AddressValidatorComponent";
import {
  useCreateHomeDataMutation,
  usePostSurveyVisitMutation,
} from "../../../redux/apiSlice";
import { useGetReCAPTCHAToken } from "../../../components/ReCaptcha";
import { ThanksForSubmission } from "../Components/ThanksForSubmission";
import { PublicSurvey } from "../Components/PublicSurvey";

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
      createHome({ address, recaptcha });
    },
    [createHome, getReCaptchaToken]
  );

  const handleAddSurveyVisit = useCallback(
    async (visit) => {
      const recaptcha = await getReCaptchaToken();
      addSurveyVisit({ visit, recaptcha });
    },
    [addSurveyVisit, getReCaptchaToken]
  );

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
      {!createHomeData && !isSurveyVisitSuccess ? (
        <AddressValidatorComponent
          onValidate={handleCreateHome}
          isLoading={isCreateHomeLoading}
        />
      ) : isSurveyVisitSuccess ? (
        <ThanksForSubmission />
      ) : (
        <PublicSurvey
          submitSurvey={handleAddSurveyVisit}
          isLoading={isSurveyVisitLoading}
          activeHome={createHomeData.address}
        />
      )}
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
