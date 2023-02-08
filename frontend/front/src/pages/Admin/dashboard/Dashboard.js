import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <Box
      textAlign="center"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      pt={20}
    >
      <Button
        variant="contained"
        size="large"
        sx={{ width: 200, height: 150, fontSize: "1.5em" }}
        component={Link}
        to={"home"}
      >
        HOMES
      </Button>
      <Button
        variant="contained"
        size="large"
        sx={{ width: 200, height: 150, fontSize: "1.5em" }}
        component={Link}
        to={"user"}
      >
        USERS
      </Button>

      <Button
        variant="contained"
        size="large"
        sx={{ width: 200, height: 150, fontSize: "1.5em" }}
        component={Link}
        to={"onlinesurvey"}
      >
        Online Survey
      </Button>

      <Button
        variant="contained"
        size="large"
        sx={{ width: 200, height: 150, fontSize: "1.5em" }}
        component={Link}
        to={"assignment"}
      >
        Assignment
      </Button>
    </Box>
  );
};

export default Dashboard;
