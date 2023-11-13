import { Alert, Button, Stack } from "@mui/material";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  buildDefaultDataFromSurveyStructure,
  buildSurveyCacheKey,
} from "../../util/surveyUtils";

import { AddressComponent } from "../AddressUtils";
import ConfirmationModal from "../../components/confirmationModal/ConfirmationModal";
import { HeatPumpDropdown } from "./HeatPumpDropdown";
import { HeatPumpTextField } from "./HeatPumpTextField";
import Loader from "../Loader";
import { SurveyError } from "./SurveyStructureError";
import { useForm } from "react-hook-form";
import { useGetSurveyStructureQuery } from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function getSurveyLangPref(currentLanguage) {
  if (currentLanguage === "en-us" || currentLanguage === "es-us") {
    return currentLanguage;
  }
  return "en-us";
}

/*
 * Reusable survey component based on https://docs.google.com/document/d/1LPCNCUBJR8aOCEnO02x0YG3cPMg7CzThlnDzruU1KvI/edit
 */
const SurveyComponent = ({
  submitSurvey,
  isLoading,
  activeHome,
  isEditable,
  surveyId,
  formSpacing,
  formDefault,
  surveyStructure,
  onDelete,
}) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { handleSubmit, reset, control, watch } = useForm({
    defaultValues: formDefault,
  });

  const [isEditing, setIsEditing] = useState(!isEditable);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isDisabled = useMemo(
    () => isEditable && !isEditing,
    [isEditing, isEditable]
  );

  const cacheKey = useMemo(
    () => buildSurveyCacheKey(surveyId, activeHome.id),
    [activeHome.id, surveyId]
  );

  // gets the data from the cache when the form initially loads
  // only use this for prepopulating the form
  const cachedData = useMemo(() => {
    const cacheDataString = localStorage.getItem(cacheKey);
    return cacheDataString ? JSON.parse(cacheDataString) : null;
  }, [cacheKey]);

  const clearCache = useCallback(() => {
    localStorage.removeItem(cacheKey);
  }, [cacheKey]);

  // useEffect to set the default data for the form
  // add in cached data here instead of in formDefault so that clicking "clear" doesn't treat the cache as default
  useEffect(() => {
    const cacheOrDefault = cachedData || formDefault;

    if (cacheOrDefault) {
      reset(cacheOrDefault);
    }
  }, [cachedData, formDefault, reset]);

  useEffect(() => {
    // function passed to watch is executed every time the form data changes
    // to update the data in the cache
    const formSubscription = watch((value) => {
      localStorage.setItem(cacheKey, JSON.stringify(value));
    });

    return () => formSubscription.unsubscribe();
  }, [cacheKey, watch]);

  const commonButtonSection = useCallback(
    () => (
      <>
        <Button variant="contained" type="submit" name="submit">
          {t("public.survey.buttons.submit")}
        </Button>
        <Button
          variant="outlined"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            reset(formDefault);
          }}
        >
          {t("public.survey.buttons.clear")}
        </Button>
      </>
    ),
    [formDefault, reset, t]
  );

  const adminButtonsViewing = useCallback(
    () => (
      <>
        <Button
          type="button"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(true);
          }}
        >
          {"EDIT"}
        </Button>
        <Button variant="outlined" type="button" onClick={() => navigate(-1)}>
          {"BACK"}
        </Button>
        <Button
          variant="outlined"
          type="button"
          color="error"
          onClick={(e) => {
            e.preventDefault();
            setIsDeleteModalOpen(true);
          }}
        >
          {"DELETE"}
        </Button>
      </>
    ),
    [navigate]
  );

  const adminButtonsEditing = useCallback(
    () => (
      <>
        <Button
          variant="contained"
          type="submit"
          onClick={() => {
            // no preventDefault here, we want to do the submit and ALSO setIsEditing(false)
            setIsEditing(false);
          }}
        >
          {"SAVE"}
        </Button>
        <Button
          variant="outlined"
          type="button"
          color="error"
          onClick={(e) => {
            e.preventDefault();
            reset(formDefault);
            setIsEditing(false);
          }}
        >
          {"CANCEL"}
        </Button>
      </>
    ),
    [formDefault, reset]
  );

  return (
    <>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        handleConfirm={() => {
          if (onDelete) {
            onDelete();
          }
        }}
        handleCancel={() => setIsDeleteModalOpen(false)}
        confirmBtnText={t("public.survey.buttons.delete")}
        cancelBtnText={t("public.survey.buttons.cancel")}
        title={t("public.survey.buttons.confirm-delete")}
        message={t("public.survey.delete-modal-confirm")}
      />
      <AddressComponent home={activeHome} />
      <form
        onSubmit={handleSubmit(async (surveyData) => {
          const { data } = await submitSurvey(
            surveyData,
            surveyId,
            activeHome.id,
            clearCache
          );
          if (!!data) {
            // clear cache data if survey submission succeeds
            clearCache();
          }
        })}
      >
        <Stack spacing={formSpacing} mb={formSpacing} mt={formSpacing}>
          {surveyStructure?.survey_questions.map((q) => {
            switch (q.response_type) {
              case "radio":
                return (
                  <HeatPumpDropdown
                    key={`q${q.id}`}
                    control={control}
                    name={`${q.id}`}
                    label={q.text}
                    options={q.response_options.map((o) => ({
                      value: o,
                      label: o,
                    }))}
                    disabled={isDisabled}
                    disableFancyLabel
                  />
                );
              case "text":
                return (
                  <HeatPumpTextField
                    key={`q${q.id}`}
                    control={control}
                    name={`${q.id}`}
                    label={q.text}
                    disabled={isDisabled}
                    disableFancyLabel
                  />
                );
              default:
                return (
                  <Alert
                    key={`q${q.id}`}
                    severity="error"
                  >{`{t('public.survey.invalid-question-type')} ${q.response_type}`}</Alert>
                );
            }
          })}
          <Stack direction="row" justifyContent="center" spacing={2}>
            {isLoading && <Loader />}
            {isEditable
              ? isEditing
                ? adminButtonsEditing()
                : adminButtonsViewing()
              : commonButtonSection()}
          </Stack>
        </Stack>
      </form>
    </>
  );
};

// makes sure data fetching happens BEFORE the form is loaded, so that the form hook can be initialized with the correct default data
const SurveyComponentWrapper = forwardRef((props, ref) => {
  const { defaultData, style, activeHome, surveyId } = props;

  const {
    i18n: { language },
  } = useTranslation();

  const {
    data: surveyStructure,
    isError: isSurveyError,
    isLoading: isSurveyLoading,
  } = useGetSurveyStructureQuery({
    id: surveyId,
    langPref: getSurveyLangPref(language),
  });

  const formDefault = useMemo(() => {
    if (defaultData) {
      return defaultData;
    }

    if (surveyStructure) {
      return buildDefaultDataFromSurveyStructure(surveyStructure);
    }

    return null;
  }, [defaultData, surveyStructure]);

  return (
    <div ref={ref} style={style}>
      {isSurveyLoading ? (
        <Loader />
      ) : isSurveyError ? (
        <SurveyError />
      ) : (
        surveyStructure &&
        formDefault &&
        activeHome && (
          <SurveyComponent
            {...props}
            surveyStructure={surveyStructure}
            formDefault={formDefault}
          />
        )
      )}
    </div>
  );
});

export default SurveyComponentWrapper;
