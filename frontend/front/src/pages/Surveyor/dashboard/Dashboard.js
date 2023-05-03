import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useGetSurveyorAssignmentQuery } from "../../../redux/surveyorViewApiSlice";
import ListView from "./ListView";

const Dashboard = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetSurveyorAssignmentQuery();

  return (
    <Box>
      <Box display={"flex"} justifyContent="center">
        <ListView />
      </Box>
    </Box>
  );
};

export default Dashboard;
