import { Controller, useController } from "react-hook-form";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useCallback } from "react";

export const HeatPumpRadio = ({
  name,
  control,
  options,
  label,
  disabled,
  required,
}) => {
  const { formState } = useController({ name, control });
  const fieldError = formState.errors[name];
  const renderRadio = useCallback(
    (field) => {
      return (
        // Red error label if required prop set to true
        <FormControl disabled={disabled} error={!!fieldError}>
          <FormLabel id={`${name}-radio-label`} htmlFor={`${name}-radio`}>
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
                label={option.value}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    },
    [label, name, options, disabled, fieldError]
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
