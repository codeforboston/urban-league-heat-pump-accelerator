import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import React from "react";
import { useNavigate } from "react-router-dom";

import { withAdminPrefix, ADMIN_HOME } from "../../../routing/routes";

const CreateNewHome = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      streetNumber: "",
      address: "",
      zipCode: "",
      city: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  const handleCancel = () => {
    navigate(withAdminPrefix(ADMIN_HOME));
  };

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
            name={"address"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Address"}
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

          <Box pt={5} textAlign="right">
            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Create
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
