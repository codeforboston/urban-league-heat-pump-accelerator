import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateHomeMutation } from "../../../api/apiSlice";

const CreateNewHome = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      streetNumber: "",
      streetName: "",
      unitNumber: "",
      city: "",
      zipCode: "",
    },
  });

  const [createHome, { isLoading, isSuccess, isError }] =
    useCreateHomeMutation();

  const onSubmit = async (data) => {
    const homeData = {
      streetNumber: data.streetNumber,
      streetName: data.streetName,
      unit_number: data.unitumber,
      city: data.city,
      zipCode: data.zipCode,
    };
    createHome(homeData);
  };
  const handleCancel = () => {
    navigate("/admin/home");
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
            name={"streetNumber"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Street Number"}
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name={"streetName"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Street Name"}
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name={"unitNumber"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Unit Number"}
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name={"city"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"City"}
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name={"zipCode"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Zip Code"}
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
            >
              {isLoading ? "Creating" : "Create"}
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
