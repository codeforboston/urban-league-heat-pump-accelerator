import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateHomeMutation } from "../../../api/apiSlice";
import { ADMIN_HOME, withAdminPrefix } from "../../../routing/routes";

const CreateNewHome = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      street_number: "",
      street_name: "",
      unit_number: "",
      city: "",
      state: "",
      zip_code: "",
    },
  });

  const [createHome, { isLoading, isSuccess, isError }] =
    useCreateHomeMutation();

  const onSubmit = async (data) => {
    createHome({ home: data });
  };
  const handleCancel = () => {
    navigate(withAdminPrefix(ADMIN_HOME));
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box width={500} mt={5}>
        <Box sx={{ bgcolor: "primary.main", color: "white" }} p={1}>
          <Typography variant="h5">Create New Home</Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="street_number"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label="Street Number"
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name="street_name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label="Street Name"
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name="unit_number"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label="Unit Number"
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label="City"
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label="State"
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name="zip_code"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label="Zip Code"
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          {isError && (
            <Alert severity="error" sx={{ my: 1 }}>
              Error Saving home
            </Alert>
          )}
          <Box pt={5} textAlign="right">
            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Saving" : "Save"}
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={handleCancel}
              color="error"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreateNewHome;
