import { Controller, useController } from "react-hook-form";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
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
}) => {
  const { field: groupField, formState } = useController({ name, control });

  const otherFieldName = `${name}/other`;
  const showOtherInput = useMemo(
    () =>
      groupField.value &&
      typeof groupField.value == "string" &&
      groupField.value.toLowerCase() === "other",
    [groupField]
  );

  const mainFieldError = formState.errors[name];
  const otherFieldError = formState.errors[otherFieldName];

  const renderDropdown = useCallback(
    (field) => {
      return (
        <FormControl fullWidth error={!!mainFieldError}>
          <InputLabel id={`${name}-dropdown-label`}>{label}</InputLabel>
          <Select
            label={label}
            name={`${name}-dropdown`}
            aria-labelledby={`${name}-dropdown-label`}
            variant="filled"
            disabled={disabled}
            {...field}
          >
            {options.map((option) => (
              <MenuItem value={option.value} key={`${option.value}-key`}>
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
