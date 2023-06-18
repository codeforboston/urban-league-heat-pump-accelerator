import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { Grid, Paper, TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { selectCurrentUser } from "../../../../features/login/loginSlice";
import {
  useGetSurveyorQuery,
  useUpdateSurveyorMutation,
} from "../../../../api/apiSlice";
import Loader from "../../../../components/Loader";
import CustomSnackbar from "../../../../components/CustomSnackbar";

const EditAccount = () => {
  const navigate = useNavigate();

  const { id } = useSelector(selectCurrentUser);

  const {
    data: {
      firstname: firstName,
      lastname: lastName,
      email,
      street_address: address,
      phone: phoneNumber,
    },
    isError: isAccountDataError,
    isLoading: isAccountDataLoading,
  } = useGetSurveyorQuery(id);

  const [
    updateAccount,
    {
      data: accountUpdateResult,
      isError: isUpdateAccountError,
      isLoading: isUpdatingAccount,
    },
  ] = useUpdateSurveyorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const paperStyle = {
    padding: 40,
    display: "flex",
    flexDirection: "column",
    width: 280,
    margin: "20px auto",
  };

  const btnstyle = { margin: "10px 0" };

  const errorStyles = {
    color: "rgb(239 68 68 / 1)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  };

  const handleUpdateAccount = useCallback(
    async (values) => {
      const updatedAccount = await updateAccount({
        id,
        body: {
          surveyor: {
            firstname: values.firstName,
            lastname: values.lastName,
            phone: values.phoneNumber,
            email,
            street_address: values.address,
          },
        },
      });
      return updatedAccount;
    },
    [updateAccount, id]
  );

  async function editAccountForms(values) {
    if (!values) return;
    handleUpdateAccount(values);
    reset();
    navigate("../account");
  }

  return (
    <Box>
      {isAccountDataLoading || isUpdatingAccount ? (
        <Loader />
      ) : isAccountDataError ? (
        <CustomSnackbar
          open={isAccountDataError}
          message="Error fetching account data."
          severity="error"
        />
      ) : isUpdateAccountError ? (
        <CustomSnackbar
          open={isUpdateAccountError}
          message="Error updating account data."
          severity="error"
        />
      ) : (
        <Paper elevation={5} style={paperStyle}>
          <Grid align="center">
            <h2>Update Account Details?</h2>
          </Grid>

          <form onSubmit={handleSubmit(editAccountForms)}>
            <TextField
              id="standard-basic"
              placeholder="Enter First Name"
              type="text"
              style={btnstyle}
              name="firstName"
              fullWidth
              label="First Name"
              variant="standard"
              defaultValue={firstName}
              {...register("firstName", {
                required: {
                  value: true,
                  message: "Please Enter First Name",
                },
              })}
            />
            <span style={errorStyles}>{errors?.firstName?.message}</span>
            <TextField
              id="standard-basic"
              placeholder="Enter Last Name"
              type="text"
              style={btnstyle}
              name="lastName"
              fullWidth
              label="Last Name"
              variant="standard"
              defaultValue={lastName}
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Please Enter Last Name",
                },
              })}
            />
            <span style={errorStyles}>{errors?.lastName?.message}</span>
            <TextField
              id="standard-basic"
              placeholder="Enter Email"
              type="email"
              style={btnstyle}
              name="email"
              fullWidth
              label="Email"
              variant="standard"
              defaultValue={email}
              {...register("email", {
                required: {
                  value: true,
                  message: "Please Enter Email",
                },
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            <span style={errorStyles}>{errors?.email?.message}</span>
            <TextField
              id="standard-basic"
              placeholder="Enter Address"
              type="text"
              style={btnstyle}
              name="address"
              fullWidth
              label="Address"
              variant="standard"
              defaultValue={address}
              {...register("address", {
                required: {
                  value: true,
                  message: "Please Enter Address",
                },
              })}
            />
            <span style={errorStyles}>{errors?.address?.message}</span>
            <TextField
              id="standard-basic"
              placeholder="Enter Phone Number"
              type="tel"
              style={btnstyle}
              name="phoneNumber"
              fullWidth
              label="Phone Number"
              variant="standard"
              defaultValue={phoneNumber}
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "Please Enter Phone Number",
                },
                pattern: {
                  value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                  message: "Please enter a valid phone number.",
                },
                maxLength: {
                  value: 17,
                  message: "Phone number too long",
                },
                minLength: {
                  value: 8,
                  message: "Phone number too short",
                },
              })}
            />
            <span style={errorStyles}>{errors?.phoneNumber?.message}</span>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => editAccountForms}
              style={{
                btnstyle,
                borderRadius: "20px",
                marginTop: "20px",
              }}
              fullWidth
            >
              Save
            </Button>
            <Button
              type="button"
              color="error"
              variant="contained"
              onClick={() => editAccountForms}
              style={{
                btnstyle,
                borderRadius: "20px",
                marginTop: "20px",
              }}
              fullWidth
              component={Link}
              to="../account"
            >
              Cancel
            </Button>
          </form>
        </Paper>
      )}
    </Box>
  );
};

export default EditAccount;
