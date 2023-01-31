import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const GetStarted = () => {
  return (
    <Box>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" mb={3} textAlign="center">
            Get Started
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GetStarted;
