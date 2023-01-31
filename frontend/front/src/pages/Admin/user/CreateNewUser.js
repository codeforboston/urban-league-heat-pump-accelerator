import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

const CreateNewUser = () => {
  const navigate = useNavigate();
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      state: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  const handleCancel = () => {
    navigate("/admin/user");
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
          <Typography variant="h5">Create User Profile</Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={"firstName"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"First Name"}
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name={"lastName"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Last Name"}
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name={"email"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Email"}
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name={"phone"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Phone"}
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />
          <Controller
            name={"streetAddress"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Street Address"}
                variant="standard"
                sx={{ width: "95%", mx: 2, mt: 3 }}
              />
            )}
          />{" "}
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
          <Controller
            name={"state"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"State"}
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

export default CreateNewUser;
