import React from "react";
import { Controller, useController } from "react-hook-form";
import { FormLabel, Grid, TextField, Stack } from "@mui/material";

/**
 * Field to collect a user's address
 * Based on this spec I found online: https://designsystem.digital.gov/templates/form-templates/address-form/
 */
export const HeatPumpAddressField = ({ control, label, disabled }) => {
  const { formState } = useController({ name: "address", control });

  return (
    <Stack spacing={1}>
      {label && (
        <FormLabel
          error={
            !!formState.errors.address?.street ||
            !!formState.errors.address?.aptNumber ||
            !!formState.errors.address?.city ||
            !!formState.errors.address?.zipCode
          }
        >
          {label}
        </FormLabel>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Controller
            name={"address.street"}
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
                label="Street Address"
                {...field}
                error={!!formState.errors.address?.street}
                helperText={
                  !!formState.errors.address?.street &&
                  formState.errors.address?.street.message
                }
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid item xs={6} lg={6}>
          <Controller
            name={"address.aptNumber"}
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="standard"
                label="Apartment Number"
                {...field}
                error={!!formState.errors.address?.aptNumber}
                helperText={
                  !!formState.errors.address?.aptNumber &&
                  formState.errors.address?.aptNumber.message
                }
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid item xs={6} lg={6}>
          <Controller
            name={"address.zipCode"}
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
                label="ZIP Code"
                {...field}
                error={!!formState.errors.address?.zipCode}
                helperText={
                  !!formState.errors.address?.zipCode &&
                  formState.errors.address?.zipCode.message
                }
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} lg={12}>
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
                label="City"
                {...field}
                error={!!formState.errors.address?.city}
                helperText={
                  !!formState.errors.address?.city &&
                  formState.errors.address?.city.message
                }
                disabled={disabled}
              />
            )}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
