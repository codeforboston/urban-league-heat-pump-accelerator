import { useController, Controller } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";

export const HeatPumpCheckbox = ({
  name,
  control,
  options,
  label,
  disabled,
  styles = {},
  required,
}) => {
  const { formState } = useController({ name, control });
  const fieldError = formState.errors[name];
  return (
    <FormControl component="fieldset" disabled={disabled} error={!!fieldError}>
      <FormLabel
        component="legend"
        sx={{
          ...styles?.label,
          marginBottom: "1rem",
        }}
      >
        {label}
      </FormLabel>
      <FormGroup>
        <Stack spacing={2}>
          {options.map((option) => (
            <Controller
              key={`option-${option.value}`}
              name={name}
              control={control}
              rules={required && { required: "This field is required" }}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      id={option.label}
                      checked={field.value?.includes(option.value) || false}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(field.value || []), option.value]
                          : field.value.filter((v) => v !== option.value);
                        field.onChange(newValue);
                      }}
                      value={option.value}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        ...styles?.label,
                      }}
                    >
                      {option.label}
                    </Typography>
                  }
                />
              )}
            />
          ))}
        </Stack>
      </FormGroup>
      {!!fieldError && required && (
        <FormHelperText>{fieldError?.message}</FormHelperText>
      )}
    </FormControl>
  );
};
