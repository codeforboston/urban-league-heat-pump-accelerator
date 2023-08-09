import { Controller, useController } from "react-hook-form";

import React from "react";
import { TextField } from "@mui/material";

export const HeatPumpPhoneField = ({ name, control, label, disabled }) => {
  const { formState } = useController({ name, control });
  const mainFieldError = formState.errors[name];

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        // type="tel" does not validate automatically
        required: { value: true, message: "This field is required!" },
        pattern: {
          value: /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
          message: "Invalid phone number.",
        },
      }}
      render={({ field }) => (
        <TextField
          id={`${name}-phoneNumber`}
          label={label}
          variant="standard"
          error={!!mainFieldError}
          helperText={!!mainFieldError && mainFieldError.message}
          disabled={disabled}
          type="tel"
          {...field}
        />
      )}
    />
  );
};
