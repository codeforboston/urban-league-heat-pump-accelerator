import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import AccordionMenu from "./AccordionMenu";

const HouseProfile = () => {
  return (
    <Box>
      <Box pt={5}></Box>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='Left'
        rowSpacing={2}
      >
        <Grid item xs={12}>
          <Box p={2}>
            <Typography variant='h5'>1008 SW Military Dr</Typography>
            <Typography>78221, San Antonio, Texas</Typography>
            <Typography>John Smith</Typography>
            <Typography>Heat Type: </Typography>
            <Typography>AC: </Typography>
            <Typography>Owner: </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AccordionMenu />
        </Grid>
        <Grid item xs={12}>
          <Box textAlign='center' mb={4}>
            <Button variant='contained' size='large'>
              Save All
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HouseProfile;
