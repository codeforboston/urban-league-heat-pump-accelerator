import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  forwardRef,
} from "react";
import { useForm } from "react-hook-form";
import { Button, Stack, Alert, CircularProgress, Box } from "@mui/material";
import { HeatPumpDropdown } from "./HeatPumpDropdown";
import ConfirmationModal from "../../pages/Developer/confirmModal/ConfirmationModal";
import { useGetSurveyStructureQuery } from "../../redux/apiSlice";
import { HeatPumpTextField } from "./HeatPumpTextField";
import { AddressComponent } from "../AddressUtils";
import { useNavigate } from "react-router-dom";
import {
  buildSurveyCacheKey,
  buildDefaultDataFromSurveyStructure,
} from "../../util/surveyUtils";

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
    [formDefault, reset]
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
        confirmBtnText="Delete"
        cancelBtnText="Cancel"
        title="Confirm Delete"
        message={`Are you sure you want to delete this survey data?`}
      />
      <AddressComponent home={activeHome} />
      <form
        onSubmit={handleSubmit(async (surveyData) => {
          const { data } = await submitSurvey(surveyData, surveyId, clearCache);
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
          })}
          <Stack direction="row" justifyContent="center" spacing={2}>
            {isLoading && <CircularProgress />}
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
  const { defaultData, surveyId, style, activeHome } = props;

  const { data: surveyStructure, error: surveyStructureError } =
    useGetSurveyStructureQuery(surveyId);

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
      {surveyStructure && formDefault && activeHome ? (
        <SurveyComponent
          {...props}
          surveyStructure={surveyStructure}
          formDefault={formDefault}
        />
      ) : surveyStructureError ? (
        <Alert severity="error">
          {"Encountered an error while loading the survey."}
        </Alert>
      ) : (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </div>
  );
});

export default SurveyComponentWrapper;
