import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";

const About = () => {
  const { title } = useSelector((state) => state.about);

  console.log(title);
  return (
    <Box p={1} m={1}>
      <Typography variant='h2'>{title} </Typography>

      <Grid
        container
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Grid
          item
          xs={12}
          md={6}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            width={200}
            height={100}
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{ backgroundColor: "LavenderBlush" }}
          >
            ONE
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            width={200}
            height={100}
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{ backgroundColor: "Beige" }}
          >
            TWO
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            width={200}
            height={100}
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{ backgroundColor: "AliceBlue" }}
          >
            THREE
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            width={200}
            height={100}
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{
              backgroundColor: "HoneyDew",
              display: { xs: "none", md: "flex" },
            }}
          >
            FOUR
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            width={200}
            height={100}
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{ backgroundColor: "SeaShell" }}
          >
            FIVE
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            width={200}
            height={100}
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{
              backgroundColor: "Thistle",
              display: { xs: "flex", md: "none" },
            }}
          >
            SIX
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
