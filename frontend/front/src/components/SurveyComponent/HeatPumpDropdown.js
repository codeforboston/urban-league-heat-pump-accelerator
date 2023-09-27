import { Controller, useController } from "react-hook-form";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormLabel,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";

/**
 * A radio group to be used with react-hook-form
 */
export const HeatPumpDropdown = ({
  name,
  control,
  options,
  label,
  disabled,
  required,
  enableOtherField,
  disableFancyLabel,
}) => {
  const Label = disableFancyLabel ? FormLabel : InputLabel;

  const { field: groupField, formState } = useController({ name, control });

  const otherFieldName = `${name}/other`;
  const showOtherInput = useMemo(
    () =>
      enableOtherField &&
      groupField.value &&
      typeof groupField.value == "string" &&
      groupField.value.toLowerCase() === "other",
    [enableOtherField, groupField]
  );

  const mainFieldError = formState.errors[name];
  const otherFieldError = formState.errors[otherFieldName];

  const renderDropdown = useCallback(
    (field) => {
      return (
        <FormControl fullWidth error={!!mainFieldError}>
          <Label id={`${name}-dropdown-label`} htmlFor={`${name}-dropdown`}>
            {label}
          </Label>
          <Select
            name={`${name}-dropdown`}
            aria-labelledby={`${name}-dropdown-label`}
            variant="filled"
            disabled={disabled}
            inputProps={{
              id: `${name}-dropdown`,
            }}
            {...field}
          >
            {options.map((option) => (
              <MenuItem value={option.value} key={`option-${option.value}`}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    },
    [name, options, label, mainFieldError, disabled]
  );

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={
          required && {
            required: { value: true, message: "This field is required!" },
          }
        }
        render={({ field }) => renderDropdown(field)}
      />
      {showOtherInput && (
        <Controller
          name={otherFieldName}
          control={control}
          rules={
            required && {
              required: {
                value: showOtherInput,
                message: "This field is required!",
              },
            }
          }
          render={({ field }) => (
            <TextField
              label="Other..."
              variant="standard"
              {...field}
              error={!!otherFieldError}
              helperText={!!otherFieldError && otherFieldError.message}
              disabled={disabled}
            />
          )}
        ></Controller>
      )}
    </>
  );
};
