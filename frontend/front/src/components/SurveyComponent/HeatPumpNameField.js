import React from "react";
import { Controller, useController } from "react-hook-form";
import { FormLabel, Stack, TextField } from "@mui/material";

export const HeatPumpNameField = ({ control, label, disabled }) => {
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
              error={!!formState.errors.name?.first}
              helperText={
                !!formState.errors.name?.first &&
                formState.errors.name?.first.message
              }
              disabled={disabled}
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
              error={!!formState.errors.name?.last}
              helperText={
                !!formState.errors.name?.last &&
                formState.errors.name?.last.message
              }
              disabled={disabled}
            />
          )}
        />
      </Stack>
    </>
  );
};
