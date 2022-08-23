import React from "react";
import { Typography, Box, Grid } from "@mui/material";
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
      <Grid
        container
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs={8}>
          xs=8
        </Grid>
        <Grid item xs={8}>
          xs=8
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
