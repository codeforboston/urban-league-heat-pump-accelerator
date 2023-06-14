import { Box, Button, Stack } from "@mui/material";
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
      <Stack>
        <Button
          variant="contained"
          size="large"
          sx={{ width: 300, height: 100, m: 2, fontSize: "1.5em" }}
          component={Link}
          to={"home"}
        >
          HOMES
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{ width: 300, height: 100, m: 2, fontSize: "1.5em" }}
          component={Link}
          to={"user"}
        >
          USERS
        </Button>

        <Button
          variant="contained"
          size="large"
          sx={{ width: 300, height: 100, m: 2, fontSize: "1.5em" }}
          component={Link}
          to={"survey"}
        >
          SURVEYS
        </Button>

        <Button
          variant="contained"
          size="large"
          sx={{ width: 300, height: 100, m: 2, fontSize: "1.5em" }}
          component={Link}
          to={"assignment"}
        >
          AssignmentS
        </Button>
      </Stack>
    </Box>
  );
};

export default Dashboard;
