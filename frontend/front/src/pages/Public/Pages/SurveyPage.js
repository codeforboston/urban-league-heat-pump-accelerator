import React, { useCallback, useEffect } from "react";
import { Alert, Container, Snackbar, Stack } from "@mui/material";
import {
  PUBLIC_MODE,
  SurveyComponent,
} from "../../../components/SurveyComponent/SurveyComponent";
import { AddressValidatorComponent } from "../Components/AddressValidatorComponent";
import { useDispatch, useSelector } from "react-redux";
import { setActiveHome } from "../../../features/home/homeSlice";
import {
  useCreateHomeDataMutation,
  usePostSurveyVisitMutation,
} from "../../../redux/apiSlice";
import { useGetReCAPTCHAToken } from "../../../components/ReCaptcha";
import { ThanksForSubmission } from "../Components/ThanksForSubmission";

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
  const activeHome = useSelector((store) => store.home.activeHome);
  const dispatch = useDispatch();

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

  // automatically update the active home if home creation succeeded
  useEffect(() => {
    if (createHomeData) {
      dispatch(setActiveHome(createHomeData.address));
    }
  }, [createHomeData, dispatch]);

  // automatically clear active home if survey submission succeeded
  useEffect(() => {
    if (isSurveyVisitSuccess) {
      dispatch(setActiveHome(null));
    }
  }, [dispatch, isSurveyVisitSuccess]);

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
      {!activeHome && !isSurveyVisitSuccess ? (
        <AddressValidatorComponent
          onValidate={handleCreateHome}
          isLoading={isCreateHomeLoading}
        />
      ) : isSurveyVisitSuccess ? (
        <ThanksForSubmission />
      ) : (
        <SurveyComponent
          mode={PUBLIC_MODE}
          submitSurvey={handleAddSurveyVisit}
          isLoading={isSurveyVisitLoading}
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
