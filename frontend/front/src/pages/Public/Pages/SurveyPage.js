import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Box, Container, Snackbar, Stack } from "@mui/material";

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
    async (answers, surveyId, homeId, _) => {
      const recaptcha = await getReCaptchaToken("create_survey");
      const surveyVisit = await addSurveyVisit({
        surveyVisit: buildSurveyVisitData(answers, homeId, surveyId, null, {
          latitude: null,
          longitude: null,
        }),
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
          <p>
            {t('public.survey.text1')}
          </p>
          <p>
            {t('public.survey.text2')}
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

        <HeatPumpFade show={showValidationLoader}>
          <CanonicalizationLoader
            homeId={createHomeData?.id}
            onResolved={setValidationStatus}
          />
        </HeatPumpFade>

        <Snackbar open={!!createHomeError}>
          <Alert severity="error">
            {t('public.survey.alert1')}
          </Alert>
        </Snackbar>
        <Snackbar open={!!surveyVisitError}>
          <Alert severity="error">{t('public.survey.alert2')}</Alert>
        </Snackbar>
        <Snackbar open={validationStatus === UNRECOGNIZED}>
          <Alert severity="error">
            {t('public.survey.alert3')}
          </Alert>
        </Snackbar>
        <Snackbar open={validationStatus === VALIDATION_ERROR}>
          <Alert severity="error">
            {t('public.survey.alert4')}
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
