import { Alert, Box, Container, Snackbar, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  useCreateHomeMutation,
  useCreateSurveyVisitMutation,
} from "../../../api/apiSlice";
import {
  logSurveyPageVisit,
  logSurveySubmission,
} from "../../../features/newrelic";
import {
  RECAPTCHA_ACTION_PUBLIC_SURVEY,
  useGetReCAPTCHAToken,
} from "../../../components/ReCaptcha";

import { HeatPumpFade } from "../../../components/HeatPumpFade";
import { HeatPumpSlide } from "../../../components/HeatPumpSlide";
import {
  buildSurveyVisitData,
  surveyAnswersToArray,
} from "../../../util/surveyUtils";
import { AddressValidatorComponent } from "../Components/AddressValidatorComponent";
import { PublicSurvey } from "../Components/PublicSurvey";
import { ThanksForSubmission } from "../Components/ThanksForSubmission";
import Heading1BlueBgGround from "../Components/Typography/Heading1BlueBgGround";

const STEP_ADDRESS = "PHASE_ADDRESS";
const STEP_SURVEY = "PHASE_SURVEY";
const STEP_THANKS = "PHASE_THANKS";

/*
 * Page that handles the lifecycle of the public survey process
 * Verify address -> display survey -> display thank you
 * This page should handle all API calls so that component switching is easier to control
 */
export const SurveyPage = () => {
  const [step, setStep] = useState(STEP_ADDRESS);

  const {
    t,
    i18n: { language },
  } = useTranslation();

  const getReCaptchaToken = useGetReCAPTCHAToken(
    RECAPTCHA_ACTION_PUBLIC_SURVEY
  );

  const [
    createHome,
    {
      data: createHomeData,
      error: createHomeError,
      isLoading: isCreateHomeLoading,
      isSuccess: isCreateHomeSucccess,
    },
  ] = useCreateHomeMutation();

  const [
    addSurveyVisit,
    {
      isLoading: isSurveyVisitLoading,
      error: surveyVisitError,
      isSuccess: isSurveyVisitSucess,
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

  useEffect(() => {
    if (isCreateHomeSucccess) {
      setStep(STEP_SURVEY);
    }
    if (isSurveyVisitSucess) {
      setStep(STEP_THANKS);
    }
  }, [isCreateHomeSucccess, isSurveyVisitSucess]);

  useEffect(() => {
    if (isCreateHomeSucccess) {
      const language = localStorage.getItem("langPref");
      logSurveyPageVisit(language);
    }
  }, [isCreateHomeSucccess]);

  useEffect(() => {
    if (isSurveyVisitSucess) {
      const language = localStorage.getItem("langPref");
      logSurveySubmission(language);
    }
  }, [isSurveyVisitSucess]);

  const handleAddSurveyVisit = useCallback(
    async (answers, surveyId, homeId, _) => {
      const recaptcha = await getReCaptchaToken("create_survey");
      const arrayAnswers = surveyAnswersToArray(answers);
      const surveyVisit = await addSurveyVisit({
        surveyVisit: buildSurveyVisitData(
          arrayAnswers,
          homeId,
          surveyId,
          null,
          {
            latitude: null,
            longitude: null,
          },
          language
        ),
        recaptcha,
      });
      if (isSurveyVisitSucess) {
        setStep(STEP_THANKS);
      }
      return surveyVisit;
    },
    [addSurveyVisit, isSurveyVisitSucess, getReCaptchaToken, language]
  );

  const pageContent = useCallback(
    () => (
      <>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          data-testid="publicSurveyInfoMessage"
        >
          <p>{t("public.survey.text1")}</p>
          <p>{t("public.survey.text2")}</p>
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

        <Snackbar open={!!createHomeError}>
          <Alert severity="error">{t("public.survey.alert1")}</Alert>
        </Snackbar>
        <Snackbar open={!!surveyVisitError}>
          <Alert severity="error">{t("public.survey.alert2")}</Alert>
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
      t,
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
      <Container>{pageContent()}</Container>
    </Box>
  );
};
