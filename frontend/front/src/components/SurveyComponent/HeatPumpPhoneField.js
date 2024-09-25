import { Controller, useController } from "react-hook-form";
import { useMemo } from "react";
import { FormControl, FormLabel, TextField } from "@mui/material";

export const HeatPumpPhoneField = ({
  name,
  control,
  label,
  disabled,
  required,
  readOnly,
  disableFancyLabel,
  styles = {},
}) => {
  const { formState } = useController({ name, control });
  const mainFieldError = formState.errors[name];
  const rules = useMemo(() => {
    const ruleList = {};
    if (required) {
      ruleList.required = { value: true, message: "This field is required!" };
    }
    ruleList.pattern = {
      value: /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
      message: "Invalid phone number.",
    };
    return ruleList;
  }, [required]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl
          fullWidth
          sx={{
            ...styles?.container,
          }}
        >
          {disableFancyLabel && (
            <FormLabel
              id={`${name}-textField-label`}
              htmlFor={`${name}-textField`}
              sx={{
                ...styles?.label,
              }}
            >
              {label}
            </FormLabel>
          )}
          <TextField
            id={`${name}-phoneNumber`}
            label={disableFancyLabel ? undefined : label}
            variant="standard"
            error={!!mainFieldError}
            helperText={!!mainFieldError && mainFieldError.message}
            type="tel"
            inputProps={{
              readOnly,
              id: `${name}-textField`,
              style: { ...styles?.label },
            }}
            {...field}
            disabled={disabled}
          />
        </FormControl>
      )}
    />
  );
};
