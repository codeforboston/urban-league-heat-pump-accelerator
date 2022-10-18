import { Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const HouseProfile = () => {
  const { hid } = useParams();

  return (
    <Box m={3}>
      <Typography variant='h2'>House Profile Page</Typography>
      <Typography variant='h3'>House ID: {hid}</Typography>
    </Box>
  );
};

export default HouseProfile;
