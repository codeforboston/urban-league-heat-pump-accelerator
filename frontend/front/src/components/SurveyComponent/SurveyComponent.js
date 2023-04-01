import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Stack, Alert, CircularProgress, Box } from "@mui/material";
import { HeatPumpDropdown } from "./HeatPumpDropdown";
import { useGetReCAPTCHAToken } from "../ReCaptcha";
import ConfirmationModal from "../../pages/Developer/confirmModal/ConfirmationModal";
import { useGetSurveyStructureQuery } from "../../redux/apiSlice";
import { HeatPumpTextField } from "./HeatPumpTextField";

const getDefaultResponse = (question) =>
  question.response_type === "radio" ? question.response_options[0] : "";

export const SURVEYOR_MODE = "SURVEYOR_MODE";
export const PUBLIC_MODE = "PUBLIC_MODE";
export const ADMIN_MODE = "ADMIN_MODE";

/*
 * Reusable survey component based on https://docs.google.com/document/d/1LPCNCUBJR8aOCEnO02x0YG3cPMg7CzThlnDzruU1KvI/edit
 */
const SurveyComponent = ({ mode }) => {
  const { handleSubmit, reset, control } = useForm();

  // TODO: id of the main survey goes here
  const { data: surveyStructure, error: surveyStructureError } =
    useGetSurveyStructureQuery("mainSurvey");

  // useEffect to set the default data for the form
  useEffect(() => {
    if (surveyStructure) {
      const defaultSurvey = surveyStructure.survey_questions.reduce(
        (prev, curr) => ({
          ...prev,
          [`${curr.id}`]: getDefaultResponse(curr),
        }),
        {}
      );
      reset(defaultSurvey);
    }
  }, [reset, surveyStructure]);

  const [isEditing, setIsEditing] = useState(
    mode === ADMIN_MODE ? false : true
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isDisabled = useMemo(
    () => mode === ADMIN_MODE && !isEditing,
    [mode, isEditing]
  );

  const getReCaptchaToken = useGetReCAPTCHAToken("submit");

  const onSubmit = async (data) => {
    // TODO: connect to back-end, pass reCaptchaToken so it can be used for validation
    const token = await getReCaptchaToken();
    alert(JSON.stringify(data, null, 4));
  };

  const onDelete = useCallback(() => {
    alert("This deletion logic still needs to be implemented!");
  }, []);

  const commonButtonSection = useCallback(
    () => (
      <>
        <Button variant="contained" type="submit">
          {"Submit"}
        </Button>
        <Button variant="outlined" type="button" onClick={() => reset()}>
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
          variant="contained"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {"EDIT"}
        </Button>
        <Button
          variant="outlined"
          type="button"
          color="error"
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
        >
          {"DELETE"}
        </Button>
      </>
    ),
    []
  );

  const adminButtonsEditing = useCallback(
    () => (
      <>
        <Button variant="contained" type="submit">
          {"SAVE"}
        </Button>
        <Button
          variant="outlined"
          type="button"
          color="error"
          onClick={() => {
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

  const formSpacing = useMemo(() => (mode === PUBLIC_MODE ? 5 : 2), [mode]);

  const renderSurvey = useCallback(
    () => (
      <>
        {surveyStructure?.survey_questions.map((q) => {
          console.log("question", q);
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
    <>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        handleConfirm={() => onDelete()}
        handleCancel={() => setIsDeleteModalOpen(false)}
        confirmBtnText="Delete"
        cancelBtnText="Cancel"
        title="Confirm Delete"
        message={`Are you sure you want to delete this survey data?`}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={formSpacing} mb={formSpacing} mt={formSpacing}>
          {surveyStructure ? (
            renderSurvey()
          ) : surveyStructureError ? (
            <Alert severity="error">
              {"Encountered an error while loading the survey."}
            </Alert>
          ) : (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          <Stack direction="row" justifyContent="center" spacing={2}>
            {mode === ADMIN_MODE
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

export const AdminSurvey = ({ defaultData }) => (
  <SurveyComponent mode={ADMIN_MODE} defaultData={defaultData} />
);

export const SurveyorSurvey = () => <SurveyComponent mode={SURVEYOR_MODE} />;

export const PublicSurvey = () => <SurveyComponent mode={PUBLIC_MODE} />;
