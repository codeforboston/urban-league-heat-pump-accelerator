import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import AdminView from "./AdminView";
import DeveloperView from "./DeveloperView";
import PublicView from "./PublicView";
import SurveyorsView from "./SurveyorView";

const ViewMenu = () => {
  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box mt={4}>
          <Box textAlign={"center"}>
            <Box height={30} />

            <Box>
              <Typography variant="h3">BOSTON HEAT PUMP ACCELERATOR</Typography>
            </Box>
            <Box m={2}>
              <Typography variant="h4">Front End Developement</Typography>
            </Box>
            <Box height={30} />
            <Box m={4}>
              <Typography variant="h3">Selection Menu</Typography>
            </Box>
            <Box mt={4}>
              <SurveyorsView link="surveyor" />
              <PublicView link="public" />
              <AdminView link="admin" />
              <DeveloperView link="dev" />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
};

export default ViewMenu;
