import React, { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Stack,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { HeatPumpAddressField } from "./HeatPumpAddressField";
import { HeatPumpNameField } from "./HeatPumpNameField";
import { HeatPumpDropdown } from "./HeatPumpDropdown";
import { useGetReCAPTCHAToken } from "../ReCaptcha";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { HeatPumpPhoneField } from "./HeatPumpPhoneField";
import ConfirmationModal from "../../pages/Developer/confirmModal/ConfirmationModal";

export const SURVEYOR_MODE = "SURVEYOR_MODE";
export const PUBLIC_MODE = "PUBLIC_MODE";
export const ADMIN_MODE = "ADMIN_MODE";

const DEFAULT_PUBLIC_FORM = {
  heatingSystem: "",
  name: { first: "", last: "" },
  isHomeowner: "",
  phoneNumber: "",
  contactTime: "",
  address: {
    street: "",
    aptNumber: "",
    city: "",
    zipCode: "",
  },
};

const DEFAULT_SURVEYOR_FORM = {
  interestedInLearningMore: "",
  homeIsEligible: "",
  heatPumpCoachInterest: "",
  otherComments: "",
};

const DEFAULT_EVALUATION_FORM = {
  visited: "",
  talkedWithOwner: "",
  ownerWasHome: "",
  installInterest: "",
  primarySpokenLanguage: "",
};

const DEFAULT_FULL_FORM = {
  ...DEFAULT_PUBLIC_FORM,
  ...DEFAULT_SURVEYOR_FORM,
  ...DEFAULT_EVALUATION_FORM,
};

const useSectionErrors = (fields, errors) =>
  useMemo(() => {
    return fields.filter((f) => !!errors[f]).length > 0;
  }, [fields, errors]);

/*
 * Reusable survey component based on https://docs.google.com/document/d/1LPCNCUBJR8aOCEnO02x0YG3cPMg7CzThlnDzruU1KvI/edit
 */
const SurveyComponent = ({ mode, defaultData }) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues:
      mode === SURVEYOR_MODE
        ? DEFAULT_FULL_FORM
        : mode === ADMIN_MODE
        ? defaultData || DEFAULT_FULL_FORM
        : DEFAULT_PUBLIC_FORM,
  });

  const [isEditing, setIsEditing] = useState(
    mode === ADMIN_MODE ? false : true
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isDisabled = useMemo(
    () => mode === ADMIN_MODE && !isEditing,
    [mode, isEditing]
  );

  const getReCaptchaToken = useGetReCAPTCHAToken("submit");

  const publicErrors = useSectionErrors(
    Object.keys(DEFAULT_PUBLIC_FORM),
    errors
  );
  const surveyorErrors = useSectionErrors(
    Object.keys(DEFAULT_SURVEYOR_FORM),
    errors
  );
  const evaluationErrors = useSectionErrors(
    Object.keys(DEFAULT_EVALUATION_FORM),
    errors
  );

  const onSubmit = async (data) => {
    // TODO: connect to back-end, pass reCaptchaToken so it can be used for validation
    const token = await getReCaptchaToken();
    alert(JSON.stringify(data, null, 4));
  };

  const onDelete = useCallback(() => {
    alert("This deletion logic still needs to be implemented!");
  }, []);

  const publicSection = useCallback(
    () => (
      <>
        <HeatPumpDropdown
          name="heatingSystem"
          control={control}
          label="Current Heating/Cooling System"
          options={[
            { label: "Boiler System", value: "Boiler System" },
            { label: "Gas", value: "Gas" },
            { label: "Other", value: "Other" },
          ]}
          disabled={isDisabled}
        />

        <HeatPumpNameField control={control} disabled={isDisabled} />

        <HeatPumpDropdown
          name="isHomeowner"
          control={control}
          label="Are you the homeowner?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          disabled={isDisabled}
        />

        <HeatPumpPhoneField
          name="phoneNumber"
          control={control}
          label="Phone Number"
          disabled={isDisabled}
        />

        <HeatPumpDropdown
          name="contactTime"
          control={control}
          label="What is the best time to call you?"
          options={[
            { label: "Morning", value: "Morning" },
            { label: "Evening", value: "Evening" },
          ]}
          disabled={isDisabled}
        />

        <HeatPumpAddressField control={control} disabled={isDisabled} />
      </>
    ),
    [control, isDisabled]
  );

  const surveyorSection = useCallback(
    () => (
      <>
        <HeatPumpDropdown
          name="interestedInLearningMore"
          control={control}
          label="Are they interested in learning more?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          disabled={isDisabled}
        />

        <HeatPumpDropdown
          name="homeIsEligible"
          control={control}
          label="Is their home eligible to install an air source heat pump?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          disabled={isDisabled}
        />

        <HeatPumpDropdown
          name="heatPumpCoachInterest"
          control={control}
          label="Do they want a heat pump coach?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          disabled={isDisabled}
        />

        <Controller
          name="otherComments"
          control={control}
          render={({ field }) => (
            <TextField
              label="Other comments"
              variant="standard"
              disabled={isDisabled}
              {...field}
            />
          )}
        />
      </>
    ),
    [control, isDisabled]
  );

  const evaluationSection = useCallback(
    () => (
      <>
        <HeatPumpDropdown
          name="visited"
          control={control}
          label="Visited?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          disabled={isDisabled}
        />

        <HeatPumpDropdown
          name="talkedWithOwner"
          control={control}
          label="Talked with owner?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          disabled={isDisabled}
        />

        <HeatPumpDropdown
          name="ownerWasHome"
          control={control}
          label="Was the owner home?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          disabled={isDisabled}
        />

        <HeatPumpDropdown
          name="installInterest"
          control={control}
          label="Are they interested in installing an air source heat pump?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          disabled={isDisabled}
        />

        <HeatPumpDropdown
          name="primarySpokenLanguage"
          control={control}
          label="Primary spoken language"
          options={[
            { label: "English", value: "English" },
            { label: "Spanish", value: "Spanish" },
            { label: "Mandarin", value: "Mandarin" },
            { label: "Other", value: "Other" },
          ]}
          disabled={isDisabled}
        />
      </>
    ),
    [control, isDisabled]
  );

  const surveyorForm = useCallback(
    () => (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={
              publicErrors
                ? { border: "2px solid #d32f2f !important" }
                : undefined
            }
          >
            <Typography>Core Questions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={5} mb={5}>
              {publicSection()}
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={
              surveyorErrors
                ? { border: "2px solid #d32f2f !important" }
                : undefined
            }
          >
            <Typography>Survey Questions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={5} mb={5}>
              {surveyorSection()}
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={
              evaluationErrors
                ? { border: "2px solid #d32f2f !important" }
                : undefined
            }
          >
            <Typography>Evaluation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={5} mb={5}>
              {evaluationSection()}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </>
    ),
    [evaluationSection, publicErrors, publicSection, surveyorSection]
  );

  const adminForm = useCallback(
    () => (
      <Stack spacing={2} mb={2}>
        {publicSection()}
        {surveyorSection()}
        {evaluationSection()}
      </Stack>
    ),
    [evaluationSection, publicSection, surveyorSection]
  );

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
          {mode === ADMIN_MODE
            ? adminForm()
            : mode === SURVEYOR_MODE
            ? surveyorForm()
            : publicSection()}
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
