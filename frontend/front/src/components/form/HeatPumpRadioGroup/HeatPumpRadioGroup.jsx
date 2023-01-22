import { Controller, useController } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import React, { useCallback, useMemo } from 'react';

const RadioGroupOption = ({ value, label }) => {
  return <FormControlLabel value={value} label={label} control={<Radio />} />;
};

/**
 * A radio group to be used with react-hook-form
 */
export const HeatPumpRadioGroup = ({ name, control, options, label }) => {
  const { field: groupField, formState } = useController({ name, control });

  const otherFieldName = `${name}/other`;
  const showOtherInput = useMemo(
    () =>
      groupField.value &&
      typeof groupField.value == 'string' &&
      groupField.value.toLowerCase() === 'other',
    [groupField]
  );

  const mainFieldError = formState.errors[name];
  const otherFieldError = formState.errors[otherFieldName];

  const renderRadioGroup = useCallback(
    (field) => {
      return (
        <FormControl error={!!mainFieldError}>
          <FormLabel id={`${name}-radio-group-label`}>{label}</FormLabel>
          <RadioGroup
            name={`${name}-radio-group`}
            aria-labelledby={`${name}-radio-group-label`}
            {...field}
          >
            {options.map((option) => (
              <RadioGroupOption
                value={option.value}
                label={option.label}
                key={`${option.value}-key`}
              />
            ))}
          </RadioGroup>
          {!!mainFieldError && (
            <FormHelperText>{mainFieldError.message}</FormHelperText>
          )}
        </FormControl>
      );
    },
    [name, options, label]
  );

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: { value: true, message: 'This field is required!' },
        }}
        render={({ field }) => renderRadioGroup(field)}
      />
      {showOtherInput && (
        <Controller
          name={otherFieldName}
          control={control}
          rules={{
            required: {
              value: showOtherInput,
              message: 'This field is required!',
            },
          }}
          render={({ field }) => (
            <TextField
              label="Other..."
              {...field}
              error={!!otherFieldError}
              helperText={!!otherFieldError && otherFieldError.message}
            />
          )}
        ></Controller>
      )}
    </>
  );
};
