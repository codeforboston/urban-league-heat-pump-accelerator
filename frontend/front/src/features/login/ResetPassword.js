import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Avatar, Box, Grid, Paper, TextField, Typography } from "@mui/material";
import Loader from "../../components/Loader";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import {
  useValidateResetTokenMutation,
  useResetPasswordMutation,
} from "../../api/apiSlice";
import { isPasswordValid } from "../../util/stringUtils";

const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "10px 0" };
const paperStyle = {
  padding: 40,
  display: "flex",
  flexDirection: "column",
  width: 280,
  margin: "20px auto",
};
const errorStyles = {
  color: "rgb(239 68 68 / 1)",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
};

const ResetPasswordSuccess = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography align="center">
        Password has been successfully reset.
      </Typography>
      <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".3125rem",
          }}
        >
          <Typography>Go to Login</Typography>
          <ArrowForwardIcon />
        </Box>
      </Link>
    </Box>
  );
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const resetPasswordToken = searchParams.get("reset_password_token");

  const [
    validateResetToken,
    { isLoading: isValidationLoading, isError: isValidationError },
  ] = useValidateResetTokenMutation();

  const [resetPassword, { isLoading: isResetLoading }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (resetPasswordToken) {
      validateResetToken(resetPasswordToken);
    }
  }, [resetPasswordToken, validateResetToken]);

  const handleSubmit = async () => {
    const newPassword = isPasswordValid(password);
    if (newPassword?.error) {
      setError(newPassword.message);
      return;
    }
    const res = await resetPassword({
      resetPasswordToken,
      password,
    }).unwrap();
    if (!res?.success) {
      return navigate("/users/password/error");
    }
    setIsSubmitted(true);
  };

  if (isValidationLoading) {
    return <Loader />;
  }

  if (!resetPasswordToken || isValidationError) {
    return navigate("/users/password/error");
  }

  return (
    <Box sx={{ mt: 20 }}>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Reset password</h2>
        </Grid>
        <TextField
          id="user-new-password"
          placeholder="Enter New Password"
          type="password"
          style={btnstyle}
          name="password"
          fullWidth
          label="New Password"
          variant="standard"
          value={password}
          required
          disabled={isSubmitted}
          onChange={({ target }) => {
            setError(null);
            setPassword(target.value);
          }}
        />
        {error && <span style={errorStyles}>{error}</span>}
        <LoadingButton
          loading={isResetLoading}
          type="submit"
          color="primary"
          variant="contained"
          style={{
            btnstyle,
            borderRadius: "20px",
            marginTop: "20px",
          }}
          fullWidth
          disabled={isSubmitted}
          onClick={handleSubmit}
        >
          Reset Password
        </LoadingButton>
        {isSubmitted && <ResetPasswordSuccess />}
      </Paper>
    </Box>
  );
}
