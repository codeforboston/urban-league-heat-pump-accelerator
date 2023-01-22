import { Controller, useController } from 'react-hook-form';
import { FormLabel, Grid, TextField } from '@mui/material';

import React from 'react';

/**
 * Field to collect a user's address
 * Based on this spec I found online: https://designsystem.digital.gov/templates/form-templates/address-form/
 */
export const HeatPumpAddressField = ({ control, showState, label }) => {
  const { formState } = useController({ name: 'address', control });

  return (
    <>
      <FormLabel
        error={
          !!formState.errors.streetAddress1 ||
          !!formState.errors.streetAddress2 ||
          !!formState.errors.city ||
          !!formState.errors.state ||
          !!formState.errors.zipCode
        }
      >
        {label}
      </FormLabel>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Controller
            name={'streetAddress1'}
            control={control}
            rules={{
              required: {
                value: true,
                message: 'This field is required!',
              },
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Street Address"
                {...field}
                error={!!formState.errors.streetAddress1}
                helperText={
                  !!formState.errors.streetAddress1 &&
                  formState.errors.streetAddress1.message
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={12} lg={12}>
          <Controller
            name={'streetAddress2'}
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Street Address line 2"
                {...field}
                error={!!formState.errors.streetAddress2}
                helperText={
                  !!formState.errors.streetAddress2 &&
                  formState.errors.streetAddress2.message
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Controller
            name={'city'}
            control={control}
            rules={{
              required: {
                value: true,
                message: 'This field is required!',
              },
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="City"
                {...field}
                error={!!formState.errors.city}
                helperText={
                  !!formState.errors.city && formState.errors.city.message
                }
              />
            )}
          />
        </Grid>

        {showState && (
          <Grid item xs={12} lg={6}>
            <Controller
              name={'state'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required!',
                },
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="State"
                  {...field}
                  error={!!formState.errors.state}
                  helperText={
                    !!formState.errors.state && formState.errors.state.message
                  }
                />
              )}
            />
          </Grid>
        )}

        <Grid item xs={12} lg={6}>
          <Controller
            name={'zipCode'}
            control={control}
            rules={{
              required: {
                value: true,
                message: 'This field is required!',
              },
              pattern: {
                value: /\d{5}/,
                message: 'Invalid ZIP code.',
              },
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="ZIP Code"
                {...field}
                error={!!formState.errors.zipCode}
                helperText={
                  !!formState.errors.zipCode && formState.errors.zipCode.message
                }
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
