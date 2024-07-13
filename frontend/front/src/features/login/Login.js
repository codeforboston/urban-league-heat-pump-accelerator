import * as routes from "../../routing/routes";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useLoginUserMutation } from "../../api/apiSlice";
import { selectCurrentUser } from "../../features/login/loginSlice";
import { ROLE_ADMIN, ROLE_SURVEYOR } from "../../features/login/loginUtils";

const Login = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

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
            id="user-email"
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
            id="user-password"
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            style={btnstyle}
            name="password"
            fullWidth
            label="Password"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                >
                  <IconButton>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("password", {
              required: {
                value: true,
                message: "Please Enter Password",
              },
            })}
          />
          <span style={errorStyles}>{errors?.password?.message}</span>
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
        <Box sx={{ mt: 2 }}>
          <Link
            to="/users/forgot"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Forgot Password?
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
