import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const avatarStyle = { backgroundColor: "rgb(239 68 68 / 1)" };
const paperStyle = {
  padding: 40,
  display: "flex",
  flexDirection: "column",
  width: 280,
  margin: "20px auto",
};

export default function ResetPasswordError() {
  return (
    <Box sx={{ mt: 20 }}>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Error</h2>
          <Typography>
            The password reset link is invalid or has expired. Please request a
            new password reset.
          </Typography>
          <Link
            to="/users/forgot"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={{
                mt: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".3125rem",
              }}
            >
              <Typography>Go to Forgot Password form</Typography>
              <ArrowForwardIcon />
            </Box>
          </Link>
        </Grid>
      </Paper>
    </Box>
  );
}
