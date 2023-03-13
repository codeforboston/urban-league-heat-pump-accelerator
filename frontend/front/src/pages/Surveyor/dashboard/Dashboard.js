import { Box, Button, Grid } from "@mui/material";
import React from "react";
import ListView from "./ListView";

const Dashboard = () => {
  return (
    <Box>
      {/* <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-end"
        rowSpacing={4}
      >
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mt={3}
            mb={2}
            px={2}
          >
            <Button variant="contained">List</Button>
            <Box p={1}></Box>
            <Button variant="contained" disabled={true}>
              Map
            </Button>
          </Box>
        </Grid>
      </Grid> */}
      <Box display={"flex"} justifyContent="center">
        <ListView />
      </Box>
    </Box>
  );
};

export default Dashboard;
