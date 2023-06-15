import * as routes from "../../routing/routes";

import {
  Alert,
  Avatar,
  Box,
  Checkbox,
  Grid,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import { ROLE_ADMIN, ROLE_SURVEYOR } from "../../features/login/loginUtils";
import React, { useMemo } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../../features/login/loginSlice";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../api/apiSlice";
import { useSelector } from "react-redux";

const Login = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginUserMutation();

  const errorMessage = useMemo(
    () =>
      loginError?.status === 401
        ? `Unrecognized email or password!`
        : !!loginError
        ? "Server error"
        : null,
    [loginError]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const paperStyle = {
    padding: 40,

    display: "flex",
    flexDirection: "column",
    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "10px 0" };

  const errorStyles = {
    color: "rgb(239 68 68 / 1)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  };

  async function doLogin(values) {
    login(values);
  }

  // redirect to proper dashboard if the user is logged in!
  if (!!currentUser) {
    switch (currentUser.role) {
      case ROLE_SURVEYOR:
        return <Navigate to={routes.SURVEYOR_DASHBOARD_ROUTE} />;
      case ROLE_ADMIN:
        return <Navigate to={routes.ADMIN_DASHBOARD_ROUTE} />;
      default:
        return (
          <Alert severity="error">{`User ${currentUser.email} has no associated role!`}</Alert>
        );
    }
  }

  return (
    <Box sx={{ marginTop: 20 }}>
      <Snackbar open={!!errorMessage}>
        {/* TODO: do NOT expose actual error message */}
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>

        <form onSubmit={handleSubmit(doLogin)}>
          <TextField
            id="standard-basic"
            placeholder="Enter Email"
            type="text"
            style={btnstyle}
            name="email"
            fullWidth
            label="Email"
            variant="standard"
            {...register("email", {
              required: {
                value: true,
                message: "Please Enter Email",
              },
            })}
          />
          <span style={errorStyles}>{errors?.email?.message}</span>
          <TextField
            id="standard-basic"
            placeholder="Enter password"
            type="password"
            style={btnstyle}
            name="password"
            fullWidth
            label="Password"
            variant="standard"
            {...register("password", {
              required: {
                value: true,
                message: "Please Enter Password",
              },
            })}
          />
          <span style={errorStyles}>{errors?.password?.message}</span>
          <div style={{ marginTop: "5px" }}>
            <FormControlLabel
              control={<Checkbox color="primary" {...register("remember")} />}
              label="Remember me"
            />
          </div>
          <LoadingButton
            loading={isLoginLoading}
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => doLogin}
            style={{
              btnstyle,
              borderRadius: "20px",
              marginTop: "20px",
            }}
            fullWidth
          >
            Log in
          </LoadingButton>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
