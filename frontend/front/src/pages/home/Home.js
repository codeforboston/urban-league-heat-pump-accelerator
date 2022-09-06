import React from "react";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import Heatpump from "./Heatpump";

const Home = () => {
  const { title } = useSelector((state) => {
    console.log(state);
    return state.home;
  });

  return (
    <Box>
      <Box
        p={3}
        m={3}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant='h1'>URBAN LEAGE HEAT PUMP</Typography>
      </Box>
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
      <Heatpump />
    </Box>
  );
};

export default Home;
