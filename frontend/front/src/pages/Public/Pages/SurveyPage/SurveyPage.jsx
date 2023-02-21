import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Container, Stack, TextField } from "@mui/material";
import { HeatPumpAddressField } from "./HeatPumpAddressField";
import { HeatPumpNameField } from "./HeatPumpNameField";
import { HeatPumpDropdown } from "./HeatPumpDropdown";
import { useGetReCAPTCHAToken } from "../../../../components/ReCaptcha";

const DEFAULT_FORM = {
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

export const SurveyPage = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: DEFAULT_FORM });

  const getReCaptchaToken = useGetReCAPTCHAToken("submit");

  const onSubmit = async (data) => {
    // TODO: connect to back-end, pass reCaptchaToken so it can be used for validation
    const token = await getReCaptchaToken();
    alert(JSON.stringify(data, null, 4));
  };

  return (
    <Container>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <h1>TAKE THE SURVEY</h1>
        <p>
          Fill out this form to record your interest in installing a heat pump
          for your home.
        </p>
        <p>
          An ULHPA representative will contact you with more information about
          the installation process.
        </p>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5} mb={5} mt={5}>
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
    </Container>
  );
};
