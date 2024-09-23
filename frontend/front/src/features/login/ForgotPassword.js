import { useState } from "react";
import { Avatar, Box, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { useRequestPasswordResetMutation } from "../../api/apiSlice";
import { isEmailValid } from "../../util/stringUtils";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [requestPasswordReset, { isLoading }] =
    useRequestPasswordResetMutation();

  const handleSubmit = async () => {
    const formattedEmail = email.trim().toLowerCase();
    if (!isEmailValid(formattedEmail)) {
      setError("Please enter a valid email");
      return;
    }
    await requestPasswordReset(formattedEmail);
    setIsSubmitted(true);
  };

  return (
    <Box sx={{ marginTop: 20 }}>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Forgot Password</h2>
        </Grid>
        <TextField
          placeholder="Enter Email"
          type="email"
          style={btnstyle}
          name="text"
          fullWidth
          label="Email"
          variant="standard"
          value={email}
          disabled={isSubmitted}
          onChange={({ target }) => {
            setError(null);
            setEmail(target.value);
          }}
        />
        {error && <span style={errorStyles}>{error}</span>}
        <LoadingButton
          loading={isLoading}
          disabled={isSubmitted}
          type="submit"
          color="primary"
          variant="contained"
          style={{
            btnstyle,
            borderRadius: "20px",
            marginTop: "20px",
          }}
          fullWidth
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
        {isSubmitted && (
          <Box sx={{ mt: 3, display: "flex" }}>
            <TaskAltIcon fontSize="large" style={{ color: "#1bbd7e" }} />
            <Typography align="center">
              If an account has been set up using this email address, you'll
              receive an email shortly.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
