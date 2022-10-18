import React from "react";
import Button from "@mui/material/Button";
import { Grid, Paper, TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "../../../../features/account/accountSlice";
import { useNavigate, Link } from "react-router-dom";

const EditAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { firstName, lastName, email, address, phoneNumber } = useSelector(
    (state) => state.account
  );

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

  async function EditAccountForms(values) {
    if (!values) return;

    dispatch(
      setAccount({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        address: values.address,
        phoneNumber: values.phoneNumber,
      })
    );

    reset();

    navigate("../account");
  }

  return (
    <Box>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <h2>Update Account Details?</h2>
        </Grid>

        <form onSubmit={handleSubmit(EditAccountForms)}>
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
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
              maxLength: {
                value: 11,
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
            onClick={() => EditAccountForms}
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
            onClick={() => EditAccountForms}
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
    </Box>
  );
};

export default EditAccount;
