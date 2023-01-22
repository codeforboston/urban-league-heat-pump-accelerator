import { Button, Container, Divider, Stack, TextField } from "@mui/material";

import { HeatPumpAddressField } from "./HeatPumpAddressField";
import { HeatPumpNameField } from "./HeatPumpNameField";
import { HeatPumpRadioGroup } from "./HeatPumpRadioGroup";
import React from "react";
import { useForm } from "react-hook-form";

const DEFAULT_FORM = {
  heatingSystem: null,
  referral: null,
  firstName: null,
  lastName: null,
  homeowner: true,
  phoneNumber: null,
  streetAddress1: null,
  streetAddress2: null,
  city: null,
  zipCode: null,
};

export const SurveyPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: DEFAULT_FORM });

  const onSubmit = (data) => {
    // TODO: connect to back-end
    alert(JSON.stringify(data, null, 4));
  };

  return (
    <Container>
      <h1>Online Survey</h1>
      <h2>Fill out this form to have someone contact with more information.</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={2}
          mb={5}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <HeatPumpRadioGroup
            name="heatingSystem"
            control={control}
            label="What kind of heating system do you have?"
            options={[
              { label: "Boiler System", value: "Boiler System" },
              { label: "Gas", value: "Gas" },
              { label: "Heat Pump", value: "Heat Pump" },
              { label: "Other", value: "Other" },
            ]}
          />

          <HeatPumpRadioGroup
            name="referral"
            control={control}
            label="How did you find this website?"
            options={[
              { label: "Internet", value: "Internet" },
              { label: "Friends", value: "Friends" },
              { label: "Other", value: "Other" },
            ]}
          />

          <HeatPumpNameField control={control} label={"Your name"} />

          <HeatPumpRadioGroup
            name="homeowner"
            control={control}
            label="Are you the homeowner?"
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />

          <TextField
            id="survey-phonenumber"
            label="Phone Number"
            variant="standard"
            {...register("phoneNumber", {
              required: { value: true, message: "This field is required!" },
              pattern: {
                value: /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
                message: "Invalid phone number.",
              },
            })}
            error={!!errors.phoneNumber}
            helperText={!!errors.phoneNumber && errors.phoneNumber.message}
          />

          <HeatPumpAddressField
            control={control}
            showState={false}
            label={
              "Please type down the home address where you think a heat pump is needed"
            }
          />

          <Stack direction="row" spacing={3}>
            <Button variant="outlined" type="button" onClick={() => reset()}>
              Clear
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};
