import { Alert, Button, Snackbar, Stack } from "@mui/material";
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
import { useDebouncedCallback } from "use-debounce";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetSurveyStructureQuery } from "../../api/apiSlice";
import { AddressComponent } from "../AddressUtils";
import Loader from "../Loader";
import { HeatPumpRadio } from "./HeatPumpRadio";
import { HeatPumpTextField } from "./HeatPumpTextField";
import { SurveyError } from "./SurveyStructureError";
import { surveyRenderRules } from "../../util/surveyUtils";
import ConditionalQuestion from "./ConditionalQuestion";

/*
 * Reusable survey component based on https://docs.google.com/document/d/1LPCNCUBJR8aOCEnO02x0YG3cPMg7CzThlnDzruU1KvI/edit
 */
const SurveyComponent = ({
  submitSurvey,
  isLoading,
  activeHome,
  surveyId,
  formSpacing,
  formDefault,
  surveyStructure,
  readOnly,
  styles = {},
  conditionalRender,
}) => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const { handleSubmit, reset, control, watch, setValue } = useForm({
    defaultValues: formDefault,
  });

  const cacheKey = useMemo(
    () => buildSurveyCacheKey(surveyId, activeHome.id),
    [activeHome.id, surveyId]
  );

  // gets the data from the cache when the form initially loads
  // only use this for prepopulating the form
  const cachedData = useMemo(() => {
    const cacheDataString = localStorage.getItem(cacheKey);
    return !readOnly && cacheDataString ? JSON.parse(cacheDataString) : null;
  }, [cacheKey, readOnly]);

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

  // Create a debounced version of saving snackbar
  const debouncedSetSaving = useDebouncedCallback(
    (value) => {
      setSaving(value);
    },
    // delay in ms, adjust as needed
    3000
  );

  useEffect(() => {
    // function passed to watch is executed every time the form data changes
    // to update the data in the cache
    const formSubscription = watch((value) => {
      localStorage.setItem(cacheKey, JSON.stringify(value));
      debouncedSetSaving(true);
    });

    return () => {
      formSubscription.unsubscribe();
      debouncedSetSaving(false);
    };
  }, [cacheKey, watch, debouncedSetSaving]);

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSaving(false);
  };

  const commonButtonSection = useCallback(
    () => (
      <>
        <Button
          variant="contained"
          type="submit"
          name="submit"
          disabled={isLoading}
        >
          {"Submit"}
        </Button>
        <Button
          variant="outlined"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            reset(formDefault);
          }}
        >
          {"Clear"}
        </Button>
      </>
    ),
    [formDefault, reset, isLoading]
  );

  const backButton = useCallback(
    () => (
      <>
        <Button variant="outlined" type="button" onClick={() => navigate(-1)}>
          {"BACK"}
        </Button>
      </>
    ),
    [navigate]
  );

  return (
    <>
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
            const renderInput = () => {
              switch (q.response_type) {
                case "radio":
                  return (
                    <HeatPumpRadio
                      key={`q${q.id}`}
                      control={control}
                      name={`${q.id}`}
                      label={q.question}
                      options={q.response_options.map((o) => ({
                        value: o,
                        label: o,
                      }))}
                      disabled={readOnly}
                      styles={styles}
                    />
                  );
                case "text":
                  return (
                    <HeatPumpTextField
                      key={`q${q.id}`}
                      control={control}
                      name={`${q.id}`}
                      label={q.question}
                      disabled={readOnly}
                      disableFancyLabel
                      styles={styles}
                    />
                  );
                default:
                  return (
                    <Alert
                      key={`q${q.id}`}
                      severity="error"
                    >{`Invalid question type: ${q.response_type}`}</Alert>
                  );
              }
            };
            const rule = surveyRenderRules[q.id];
            return conditionalRender && rule ? (
              <ConditionalQuestion
                key={`q${q.id}`}
                control={control}
                rule={rule}
                id={q.id}
                formDefault={formDefault}
                setValue={setValue}
              >
                {renderInput()}
              </ConditionalQuestion>
            ) : (
              renderInput()
            );
          })}
          <Stack direction="row" justifyContent="center" spacing={2}>
            {isLoading && <Loader />}
            {readOnly ? backButton() : commonButtonSection()}
          </Stack>
        </Stack>
        <Snackbar open={saving} autoHideDuration={1000} onClose={closeSnackbar}>
          <Alert onClose={closeSnackbar} severity="success" variant="filled">
            Survey saved
          </Alert>
        </Snackbar>
      </form>
    </>
  );
};

// makes sure data fetching happens BEFORE the form is loaded, so that the form hook can be initialized with the correct default data
const SurveyComponentWrapper = forwardRef((props, ref) => {
  const { defaultData, style, activeHome, surveyId } = props;

  const {
    data: surveyStructure,
    isError: isSurveyError,
    isLoading: isSurveyLoading,
  } = useGetSurveyStructureQuery(surveyId);

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
