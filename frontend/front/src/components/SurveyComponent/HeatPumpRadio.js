import { Controller, useController } from "react-hook-form";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";
import { useCallback } from "react";

export const HeatPumpRadio = ({
  name,
  control,
  options,
  label,
  disabled,
  required,
  styles = {},
}) => {
  const { formState } = useController({ name, control });
  const fieldError = formState.errors[name];
  const renderRadio = useCallback(
    (field) => {
      return (
        // Red error label if required prop set to true
        <FormControl
          disabled={disabled}
          error={!!fieldError}
          sx={{ ...styles?.container }}
        >
          <FormLabel
            id={`${name}-radio-label`}
            htmlFor={`${name}-radio`}
            sx={{
              ...styles?.label,
            }}
          >
            {label}
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby={`${name}-dropdown-group-label`}
            {...field}
          >
            {options.map((option) => (
              <FormControlLabel
                key={`option-${option.value}`} // optional
                value={option.value}
                control={<Radio />}
                label={
                  <Typography
                    sx={{
                      ...styles?.label,
                    }}
                  >
                    {option.value}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    },
    [label, name, options, disabled, fieldError, styles.container, styles.label]
  );

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => renderRadio(field)}
        rules={
          required && {
            required: { value: true, message: "This field is required!" },
          }
        }
      />
    </>
  );
};
