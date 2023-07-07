import { Controller, useController } from "react-hook-form";
import React, { useMemo } from "react";

import { TextField } from "@mui/material";

export const HeatPumpTextField = ({
  name,
  control,
  label,
  disabled,
  required,
  type,
  readOnly,
}) => {
  const { formState } = useController({ name, control });

  const inputType = useMemo(
    // zipcode is not a real html input type
    () => (!type || type === "zipcode" ? "text" : type),
    [type]
  );

  const rules = useMemo(() => {
    const ruleList = {};

    if (required) {
      ruleList.required = { value: true, message: "This field is required!" };
    }

    // whether or not email is automatically validated seems to depend on the browser
    if (type === "email") {
      ruleList.pattern = {
        value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        message: "Invalid email address.",
      };
    }

    if (type === "zipcode") {
      ruleList.pattern = {
        value: /\d{5}/,
        message: "Invalid ZIP code.",
      };
    }
  }, [type, required]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          data-testid={name}
          label={label}
          variant="standard"
          error={!!formState.errors[name]}
          helperText={
            !!formState.errors[name] && formState.errors[name].message
          }
          disabled={disabled}
          type={inputType}
          inputProps={{ readOnly }}
          {...field}
        />
      )}
    />
  );
};
