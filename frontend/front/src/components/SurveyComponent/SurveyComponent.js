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

/*
 * Reusable survey component based on https://docs.google.com/document/d/1LPCNCUBJR8aOCEnO02x0YG3cPMg7CzThlnDzruU1KvI/edit
 */
export const SurveyComponent = forwardRef(
  (
    {
      submitSurvey,
      isLoading,
      activeHome,
      isEditable,
      surveyId,
      formSpacing,
      defaultData,
      onDelete,
      style, // passed through so MUI transitions work
    },
    ref
  ) => {
    const navigate = useNavigate();

    const { handleSubmit, reset, control } = useForm();

    // TODO: id of the main survey goes here
    const { data: surveyStructure, error: surveyStructureError } =
      useGetSurveyStructureQuery(surveyId);

    const formDefault = useMemo(() => {
      if (defaultData) {
        return defaultData;
      }

      if (surveyStructure) {
        return surveyStructure.survey_questions.reduce(
          (prev, curr) => ({
            ...prev,
            [`${curr.id}`]: "",
          }),
          {}
        );
      }

      return null;
    }, [defaultData, surveyStructure]);

    // useEffect to set the default data for the form
    useEffect(() => {
      if (formDefault) {
        reset(formDefault);
      }
    }, [formDefault, reset]);

    const [isEditing, setIsEditing] = useState(!isEditable);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const isDisabled = useMemo(
      () => isEditable && !isEditing,
      [isEditing, isEditable]
    );

    const commonButtonSection = useCallback(
      () => (
        <>
          <Button variant="contained" type="submit">
            {"Submit"}
          </Button>
          <Button
            variant="outlined"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
          >
            {"Clear"}
          </Button>
        </>
      ),
      [reset]
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
              reset();
              setIsEditing(false);
            }}
          >
            {"CANCEL"}
          </Button>
        </>
      ),
      [reset]
    );

    const renderSurvey = useCallback(
      () => (
        <>
          {surveyStructure?.survey_questions.map((q) => {
            switch (q.response_type) {
              case "radio":
                return (
                  <HeatPumpDropdown
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
                    control={control}
                    name={`${q.id}`}
                    label={q.text}
                    disabled={isDisabled}
                  />
                );
              default:
                return (
                  <Alert severity="error">{`Invalid question type: ${q.response_type}`}</Alert>
                );
            }
          })}
        </>
      ),
      [control, isDisabled, surveyStructure?.survey_questions]
    );

    return (
      <div ref={ref} style={style}>
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
          onSubmit={handleSubmit((surveyData) =>
            submitSurvey(surveyData, surveyId)
          )}
        >
          <Stack spacing={formSpacing} mb={formSpacing} mt={formSpacing}>
            {surveyStructure ? (
              renderSurvey()
            ) : surveyStructureError ? (
              <Alert severity="error">
                {"Encountered an error while loading the survey."}
              </Alert>
            ) : !activeHome ? (
              <Alert severity="error">{"No active home set!"}</Alert>
            ) : (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            )}
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
      </div>
    );
  }
);
