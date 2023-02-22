import React, { useCallback, useMemo } from "react";
import cx from "classnames";
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
import styles from "./SurveyComponent.module.css";

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

const useSectionErrors = (fields, errors) =>
  useMemo(() => {
    return fields.filter((f) => !!errors[f]).length > 0;
  }, [fields, errors]);

/*
 * Reusable survey component based on https://docs.google.com/document/d/1LPCNCUBJR8aOCEnO02x0YG3cPMg7CzThlnDzruU1KvI/edit
 */
export const SurveyComponent = ({ isSurveyor }) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: isSurveyor
      ? {
          ...DEFAULT_PUBLIC_FORM,
          ...DEFAULT_SURVEYOR_FORM,
          ...DEFAULT_EVALUATION_FORM,
        }
      : DEFAULT_PUBLIC_FORM,
  });

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

  const PublicSection = useCallback(
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
        />

        <HeatPumpNameField control={control} />

        <HeatPumpDropdown
          name="isHomeowner"
          control={control}
          label="Are you the homeowner?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
        />

        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: { value: true, message: "This field is required!" },
            pattern: {
              value: /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
              message: "Invalid phone number.",
            },
          }}
          render={({ field }) => (
            <TextField
              id="survey-phonenumber"
              label="Phone Number"
              variant="standard"
              error={!!errors.phoneNumber}
              helperText={!!errors.phoneNumber && errors.phoneNumber.message}
              {...field}
            />
          )}
        />

        <HeatPumpDropdown
          name="contactTime"
          control={control}
          label="What is the best time to call you?"
          options={[
            { label: "Morning", value: "Morning" },
            { label: "Evening", value: "Evening" },
          ]}
        />

        <HeatPumpAddressField control={control} />
      </>
    ),
    [control, errors]
  );

  const SurveyorSection = useCallback(
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
        />

        <HeatPumpDropdown
          name="homeIsEligible"
          control={control}
          label="Is their home eligible to install an air source heat pump?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
        />

        <HeatPumpDropdown
          name="heatPumpCoachInterest"
          control={control}
          label="Do they want a heat pump coach?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
        />

        <Controller
          name="otherComments"
          control={control}
          render={({ field }) => (
            <TextField label="Other comments" variant="standard" {...field} />
          )}
        />
      </>
    ),
    [control]
  );

  const EvaluationSection = useCallback(
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
        />

        <HeatPumpDropdown
          name="talkedWithOwner"
          control={control}
          label="Talked with owner?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
        />

        <HeatPumpDropdown
          name="ownerWasHome"
          control={control}
          label="Was the owner home?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
        />

        <HeatPumpDropdown
          name="installInterest"
          control={control}
          label="Are they interested in installing an air source heat pump?"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
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
        />
      </>
    ),
    [control]
  );

  const SurveyorForm = useCallback(
    () => (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            className={cx({ [styles.accordionError]: publicErrors })}
          >
            <Typography>Core Questions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={5} mb={5}>
              <PublicSection />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            className={cx({ [styles.accordionError]: surveyorErrors })}
          >
            <Typography>Survey Questions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={5} mb={5}>
              <SurveyorSection />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            className={cx({ [styles.accordionError]: evaluationErrors })}
          >
            <Typography>Evaluation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={5} mb={5}>
              <EvaluationSection />
            </Stack>
          </AccordionDetails>
        </Accordion>
      </>
    ),
    [evaluationErrors, publicErrors, surveyorErrors]
  );

  const formSpacing = useMemo(() => (isSurveyor ? 2 : 5), [isSurveyor]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={formSpacing} mb={formSpacing} mt={formSpacing}>
        {isSurveyor ? <SurveyorForm /> : <PublicSection />}
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button variant="outlined" type="button" onClick={() => reset()}>
            Clear
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
