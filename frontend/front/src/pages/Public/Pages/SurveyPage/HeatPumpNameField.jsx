import { Controller, useController } from "react-hook-form";
import { FormLabel, Stack, TextField } from "@mui/material";

import React from "react";

export const HeatPumpNameField = ({ control, label }) => {
  const { formState } = useController({ name: "address", control });

  return (
    <>
      <FormLabel
        error={!!formState.errors.firstName || !!formState.errors.lastName}
      >
        {label}
      </FormLabel>
      <Stack spacing={2} direction="row">
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This field is required!",
            },
          }}
          render={({ field }) => (
            <TextField
              label="First Name"
              variant="standard"
              {...field}
              error={!!formState.errors.firstName}
              helperText={
                !!formState.errors.firstName &&
                formState.errors.firstName.message
              }
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          rules={{
            required: {
              value: true,
              message: "This field is required!",
            },
          }}
          render={({ field }) => (
            <TextField
              label="Last Name"
              variant="standard"
              {...field}
              error={!!formState.errors.lastName}
              helperText={
                !!formState.errors.lastName && formState.errors.lastName.message
              }
            />
          )}
        />
      </Stack>
    </>
  );
};
