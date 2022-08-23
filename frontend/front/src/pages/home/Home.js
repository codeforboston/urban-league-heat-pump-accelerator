import React from "react";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

const Home = () => {
  const { title } = useSelector((state) => state.home);

  return (
    <Box p={1} m={1}>
      <Typography variant='h2'>{title} </Typography>
    </Box>
  );
};

export default Home;
