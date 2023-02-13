import React from "react";
import { Controller, useController } from "react-hook-form";
import { FormLabel, Stack, TextField } from "@mui/material";

export const HeatPumpNameField = ({ control, label }) => {
  const { formState } = useController({ name: "address", control });

  return (
    <>
      {label && (
        <FormLabel
          error={!!formState.errors.firstName || !!formState.errors.lastName}
        >
          {label}
        </FormLabel>
      )}
      <Stack direction="row" spacing={2}>
        <Controller
          name="name.first"
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
              fullWidth
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
          name="name.last"
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
              fullWidth
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
