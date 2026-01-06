import { Controller, useController } from "react-hook-form";
import { FormLabel, Grid, TextField, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * Field to collect a user's address
 * Based on this spec I found online: https://designsystem.digital.gov/templates/form-templates/address-form/
 */
export const HeatPumpAddressField = ({ control, label, disabled }) => {
  const { formState } = useController({ name: "address", control });
  const { t } = useTranslation();
  return (
    <Stack>
      {label && (
        <FormLabel
          error={
            !!formState.errors.address?.street_number ||
            !!formState.errors.address?.street_name ||
            !!formState.errors.address?.unit_number ||
            !!formState.errors.address?.city ||
            !!formState.errors.address?.state ||
            !!formState.errors.address?.zip_code
          }
          sx={{ mb: 4 }}
        >
          {label}
        </FormLabel>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <Controller
            name={"address.street_number"}
            control={control}
            rules={{
              required: {
                value: true,
                message: "This field is required!",
              },
              pattern: {
                value: /\d+/,
                message: "Invalid street number.",
              },
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="standard"
                label={t("public.survey.addressFields.streetNumber")}
                {...field}
                error={!!formState.errors.address?.street_number}
                helperText={
                  !!formState.errors.address?.street_number &&
                  formState.errors.address?.street_number.message
                }
                disabled={disabled}
                autoComplete="address-line1"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Controller
            name={"address.street_name"}
            control={control}
            rules={{
              required: {
                value: true,
                message: "This field is required!",
              },
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="standard"
                label={t("public.survey.addressFields.streetName")}
                {...field}
                error={!!formState.errors.address?.street_name}
                helperText={
                  !!formState.errors.address?.street_name &&
                  formState.errors.address?.street_name.message
                }
                disabled={disabled}
                autoComplete="address-line1"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Controller
            name={"address.unit_number"}
            control={control}
            rules={{
              pattern: {
                value: /\d+/,
                message: "Invalid unit number.",
              },
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="standard"
                label={t("public.survey.addressFields.unitNumber")}
                {...field}
                error={!!formState.errors.address?.unit_number}
                helperText={
                  !!formState.errors.address?.unit_number &&
                  formState.errors.address?.unit_number.message
                }
                disabled={disabled}
                autoComplete="address-line2"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Controller
            name={"address.city"}
            control={control}
            rules={{
              required: {
                value: true,
                message: "This field is required!",
              },
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="standard"
                label={t("public.survey.addressFields.city")}
                {...field}
                error={!!formState.errors.address?.city}
                helperText={
                  !!formState.errors.address?.city &&
                  formState.errors.address?.city.message
                }
                disabled={disabled}
                autoComplete="address-level2"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Controller
            name={"address.state"}
            control={control}
            rules={{
              required: {
                value: true,
                message: "This field is required!",
              },
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="standard"
                label={t("public.survey.addressFields.state")}
                {...field}
                error={!!formState.errors.address?.state}
                helperText={
                  !!formState.errors.address?.state &&
                  formState.errors.address?.state.message
                }
                disabled={disabled}
                autoComplete="address-level1"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Controller
            name={"address.zip_code"}
            control={control}
            rules={{
              required: {
                value: true,
                message: "This field is required!",
              },
              pattern: {
                value: /\d{5}/,
                message: "Invalid ZIP code.",
              },
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="standard"
                label={t("public.survey.addressFields.zipCode")}
                {...field}
                error={!!formState.errors.address?.zip_code}
                helperText={
                  !!formState.errors.address?.zip_code &&
                  formState.errors.address?.zip_code.message
                }
                disabled={disabled}
                autoComplete="postal-code"
              />
            )}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
