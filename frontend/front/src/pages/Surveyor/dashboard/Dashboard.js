import { Box } from "@mui/material";
import React from "react";
import ListView from "./ListView";

const Dashboard = () => {
  return (
    <Box display={"flex"} justifyContent="center">
      <ListView />
    </Box>
  );
};

export default Dashboard;
