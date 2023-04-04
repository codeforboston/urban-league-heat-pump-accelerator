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
    <Stack>
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
                label="* Street Number"
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
                label="* Street Name"
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
                label="Unit Number"
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
                label="* City"
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
            defaultValue={"MA"}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="standard"
                label="* State"
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
                label="* ZIP Code"
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
