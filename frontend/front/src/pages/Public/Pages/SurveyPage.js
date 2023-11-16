import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Box, Container, Snackbar, Stack } from "@mui/material";
import TitleHero from "../Components/Typography/TitleHero";
import Heading2 from "../Components/Typography/Heading2";

import {
  RECAPTCHA_ACTION_PUBLIC_SURVEY,
  useGetReCAPTCHAToken,
} from "../../../components/ReCaptcha";
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
import CanonicalizationLoader, {
  CANONICALIZED,
  UNCANONICALIZED,
  UNRECOGNIZED,
  VALIDATION_ERROR,
} from "../Components/CanonicalizationLoader";

const STEP_ADDRESS = "PHASE_ADDRESS";
const STEP_SURVEY = "PHASE_SURVEY";
const STEP_THANKS = "PHASE_THANKS";

const SUPPORTED_LANGUAGES = ["en-us", "es-us"];

function isLanguageSupported(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

/*
 * Page that handles the lifecycle of the public survey process
 * Verify address -> display survey -> display thank you
 * This page should handle all API calls so that component switching is easier to control
 */
export const SurveyPage = () => {
  const [validationStatus, setValidationStatus] = useState();

  const {
    t,
    i18n: { language },
  } = useTranslation();

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

  const isCanonicalized = validationStatus === CANONICALIZED;

  const step = useMemo(() => {
    if (!isCanonicalized && !isSurveyVisitSuccess) {
      return STEP_ADDRESS;
    } else if (isSurveyVisitSuccess) {
      return STEP_THANKS;
    } else if (!!createHomeData && isCanonicalized) {
      return STEP_SURVEY;
    }
  }, [createHomeData, isSurveyVisitSuccess, isCanonicalized]);

  const showValidationLoader = useMemo(() => {
    if (!createHomeData?.id) return false;
    if (step !== STEP_ADDRESS) return false;
    if (validationStatus === UNCANONICALIZED || validationStatus === undefined)
      return true;
    return false; // For completed validations (unrecognized or canonicalized).
  }, [createHomeData, validationStatus, step]);

  // Reset validation status on resubmission.
  useEffect(() => {
    if (isCreateHomeLoading) setValidationStatus(undefined);
  }, [isCreateHomeLoading]);

  const pageContent = useCallback(
    () => (
      <>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          data-testid="publicSurveyInfoMessage"
        >
          {!isLanguageSupported(language) && (
            <Alert severity="warning">
              {t("public.survey.language-missing")}
            </Alert>
          )}

          <p>{t("public.survey.fill-out-form")}</p>
          <p>{t("public.survey.ulhpa-representative")}</p>
        </Stack>
        <HeatPumpFade show={step === STEP_ADDRESS}>
          <AddressValidatorComponent
            onValidate={handleCreateHome}
            isLoading={isCreateHomeLoading}
            validationStatus={validationStatus}
            createHomeError={createHomeError}
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

        <HeatPumpFade show={showValidationLoader}>
          <CanonicalizationLoader
            homeId={createHomeData?.id}
            onResolved={setValidationStatus}
          />
        </HeatPumpFade>

        <Snackbar open={!!createHomeError}>
          <Alert severity="error">{t("public.survey.error-submitting")}</Alert>
        </Snackbar>
        <Snackbar open={!!surveyVisitError}>
          <Alert severity="error"> {t("public.survey.error-submitting")}</Alert>
        </Snackbar>
        <Snackbar open={validationStatus === UNRECOGNIZED}>
          <Alert severity="error">{t("public.survey.error-validating")}</Alert>
        </Snackbar>
        <Snackbar open={validationStatus === VALIDATION_ERROR}>
          <Alert severity="error">
            {t("public.survey.error-validating-or-already-used")}
          </Alert>
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
      showValidationLoader,
      validationStatus,
      t,
      language,
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
