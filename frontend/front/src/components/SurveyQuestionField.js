import { Controller, useController } from "react-hook-form";
// field to edit the survey questions themselves
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";

const RESPONSE_TYPES = [
  { value: "radio", label: "Radio" },
  { value: "text", label: "Text" },
];

export const SurveyQuestionField = ({
  field,
  index,
  control,
  disabled,
  readOnly,
}) => {
  const renderQuestionText = useCallback(
    (field) => (
      <TextField
        label="Question Text"
        variant="standard"
        // error={!!formState.errors[name]}
        // helperText={!!formState.errors[name] && formState.errors[name].message}
        disabled={disabled}
        inputProps={{ readOnly }}
        {...field}
      />
    ),
    [readOnly, disabled]
  );

  const renderResponseType = useCallback(
    (field) => (
      <FormControl fullWidth>
        <InputLabel id={`${field.id}-dropdown-label`}>
          {"Response Type"}
        </InputLabel>
        <Select
          label="Response Type"
          name={`${field.id}-response-type-dropdown`}
          aria-labelledby={`${field.id}-response-type-dropdown-label`}
          variant="filled"
          disabled={disabled}
          readOnly={readOnly}
          {...field}
        >
          {RESPONSE_TYPES.map((option) => (
            <MenuItem value={option.value} key={`option-${option.value}`}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
    [disabled, readOnly]
  );

  const { field: responseTypeField } = useController({
    name: `survey_questions.${index}.response_type`,
    control,
  });

  const renderResponseOptions = useCallback(
    (field) => (
      <TextField
        label="Response Options (ENTER-separated)"
        variant="standard"
        multiline
        // error={!!formState.errors[name]}
        // helperText={!!formState.errors[name] && formState.errors[name].message}
        disabled={disabled || responseTypeField.value !== "radio"}
        inputProps={{ readOnly }}
        {...field}
        value={field.value?.join("\n")}
        onChange={(event) =>
          field.onChange({
            ...event,
            target: { ...event.target, value: event.target.value.split("\n") },
          })
        }
      />
    ),
    [disabled, readOnly, responseTypeField.value]
  );

  return (
    <Stack
      direction="column"
      key={field.id}
      spacing={1}
      sx={{ border: 1, padding: "1em" }}
    >
      <Typography variant="h6">{`Q${index + 1}`}</Typography>
      <Controller
        name={`survey_questions.${index}.text`}
        control={control}
        render={({ field }) => renderQuestionText(field)}
      />
      <Controller
        name={`survey_questions.${index}.response_type`}
        control={control}
        render={({ field }) => renderResponseType(field)}
      />
      <Controller
        name={`survey_questions.${index}.response_options`}
        control={control}
        render={({ field }) => renderResponseOptions(field)}
      />
    </Stack>
  );
};
