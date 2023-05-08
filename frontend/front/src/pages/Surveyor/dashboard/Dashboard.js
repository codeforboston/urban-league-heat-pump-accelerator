import { Box, Button, Grid, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import React from "react";
import { useGetSurveyorAssignmentQuery } from "../../../redux/surveyorViewApiSlice";
import ListView from "./ListView";

const Dashboard = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetSurveyorAssignmentQuery();

  return (
      <Box display={"flex"} justifyContent="center">
        { isLoading ? <CircularProgress /> : <ListView /> }
      </Box>
  );
};

export default Dashboard;