import { Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { uid } = useParams();

  return (
    <Box m={3}>
      <Typography variant='h2'>User Profile Page</Typography>
      <Typography variant='h3'>USER ID: {uid}</Typography>
    </Box>
  );
};

export default UserProfile;
