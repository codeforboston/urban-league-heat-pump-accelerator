import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Box, Container, Snackbar, Stack } from "@mui/material";
import TitleHero from "../Components/Typography/TitleHero";
import Heading2 from "../Components/Typography/Heading2";

import {
  RECAPTCHA_ACTION_PUBLIC_SURVEY,
  useGetReCAPTCHAToken,
} from "../../../components/ReCaptcha";
import React, { useCallback, useMemo } from "react";
import {
  useCreateHomeMutation,
  useCreateSurveyVisitMutation,
} from "../../../api/apiSlice";

import { AddressValidatorComponent } from "../Components/AddressValidatorComponent";
import Heading1BlueBgGround from "../Components/Typography/Heading1BlueBgGround";
import { HeatPumpFade } from "../../../components/HeatPumpFade";
import { HeatPumpSlide } from "../../../components/HeatPumpSlide";
import { PublicSurvey } from "../Components/PublicSurvey";
import { ThanksForSubmission } from "../Components/ThanksForSubmission";
import { buildSurveyVisitData } from "../../../util/surveyUtils";

const STEP_ADDRESS = "PHASE_ADDRESS";
const STEP_SURVEY = "PHASE_SURVEY";
const STEP_THANKS = "PHASE_THANKS";

/*
 * Page that handles the lifecycle of the public survey process
 * Verify address -> display survey -> display thank you
 * This page should handle all API calls so that component switching is easier to control
 */
export const SurveyPage = () => {
  const [validationStatus, setValidationStatus] = useState();

  const { t } = useTranslation();

  const getReCaptchaToken = useGetReCAPTCHAToken(
    RECAPTCHA_ACTION_PUBLIC_SURVEY
  );

  // this ought to just be a global constant but that made it untestable
  const publicSurveyEnabled = useMemo(
    () => process.env.REACT_APP_PUBLIC_SURVEY_ENABLED === "true",
    []
  );

  const [
    createHome,
    {
      data: createHomeData,
      error: createHomeError,
      isLoading: isCreateHomeLoading,
    },
  ] = useCreateHomeMutation();

  const [
    addSurveyVisit,
    {
      isLoading: isSurveyVisitLoading,
      error: surveyVisitError,
      isSuccess: isSurveyVisitSuccess,
    },
  ] = useCreateSurveyVisitMutation();

  const handleCreateHome = useCallback(
    async ({ address }) => {
      const recaptcha = await getReCaptchaToken("create_survey");
      const home = await createHome({ home: { ...address }, recaptcha });
      return home;
    },
    [createHome, getReCaptchaToken]
  );

  const handleAddSurveyVisit = useCallback(
    async (answers, surveyId, homeId) => {
      const recaptcha = await getReCaptchaToken("create_survey");
      const surveyVisit = await addSurveyVisit({
        surveyVisit: buildSurveyVisitData(answers, homeId, surveyId),
        recaptcha,
      });
      return surveyVisit;
    },
    [addSurveyVisit, getReCaptchaToken]
  );

  const step = useMemo(() => {
    if (!createHomeData && !isSurveyVisitSuccess) {
      return STEP_ADDRESS;
    } else if (isSurveyVisitSuccess) {
      return STEP_THANKS;
    }
    return STEP_SURVEY;
  }, [createHomeData, isSurveyVisitSuccess]);

  const pageContent = useCallback(
    () => (
      <>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          data-testid="publicSurveyInfoMessage"
        >
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
      </>
    ),
    [
      createHomeData,
      createHomeError,
      handleAddSurveyVisit,
      handleCreateHome,
      isCreateHomeLoading,
      isSurveyVisitLoading,
      step,
      surveyVisitError,
    ]
  );

  return (
    <Box
      mb={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 520px)",
      }}
    >
      <Heading1BlueBgGround text={t("public.survey.heading1BlueBgGround")} />
      <Container>
        {publicSurveyEnabled ? (
          pageContent()
        ) : (
          <Box
            sx={{ textAlign: "center", pb: 7 }}
            data-testid="publicSurveyUnderConstruction"
          >
            <TitleHero titleBold={t("public.survey.work-in-progress")} />
            <Heading2 text={t("public.survey.under-construction")} />
          </Box>
        )}
      </Container>
    </Box>
  );
};
