import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { SurveyorSurvey } from "../../../components/SurveyComponent/SurveyComponent";

const HouseProfile = () => {
  return (
    <Box>
      <Box pt={5}></Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="Left"
        rowSpacing={2}
      >
        <Grid item xs={12}>
          <Box p={2}>
            <Typography variant="h5">1008 SW Military Dr</Typography>
            <Typography>78221, San Antonio, Texas</Typography>
            <Typography>John Smith</Typography>
            <Typography>Heat Type: </Typography>
            <Typography>AC: </Typography>
            <Typography>Owner: </Typography>
          </Box>
        </Grid>
        <SurveyorSurvey />
      </Grid>
    </Box>
  );
};

export default HouseProfile;
