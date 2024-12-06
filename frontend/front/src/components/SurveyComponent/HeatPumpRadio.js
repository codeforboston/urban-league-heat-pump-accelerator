import { Controller, useController } from "react-hook-form";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Stack,
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
        <Box component="fieldset" sx={{ border: 0, padding: 0 }}>
          <FormControl
            disabled={disabled}
            error={!!fieldError}
            sx={{ ...styles?.container }}
          >
            <Typography
              component="legend"
              sx={{
                ...styles?.label,
                ...(disabled && { color: "rgba(0, 0, 0, 0.38)" }),
                marginBottom: "1rem",
              }}
              id={`${name}-radio-group-label`}
            >
              {label}
            </Typography>
            <RadioGroup
              row
              aria-labelledby={`${name}-radio-group-label`}
              {...field}
            >
              <Stack spacing={2}>
                {options.map((option, i) => (
                  <FormControlLabel
                    key={`${name}-option${i + 1}`}
                    value={option.value}
                    control={<Radio id={`${name}-option${i + 1}`} />}
                    label={
                      <Typography
                        component="label"
                        htmlFor={`${name}-option${i + 1}`}
                        sx={{
                          ...styles?.label,
                        }}
                      >
                        {option.value}
                      </Typography>
                    }
                  />
                ))}
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>
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
