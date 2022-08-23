import React from "react";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

const Home = () => {
  const { title } = useSelector((state) => state.home);

  return (
    <Box>
      <Box p={1} m={1}>
        <Typography variant='h2'>{title} </Typography>
      </Box>
      <Box p={1} m={1}>
        <Typography variant='h4'>Material UI Enabled</Typography>
      </Box>
      <Box p={1} m={1}>
        <Typography variant='h4'>ReduxToolKit Enabled</Typography>
      </Box>
      <Box p={1} m={1}>
        <Typography variant='h4'>React-Router Enabled</Typography>
      </Box>
   
    </Box>
  );
};

export default Home;
