import { Box, Button, Grid, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import React from "react";
import { useGetSurveyorAssignmentQuery } from "../../../redux/surveyorViewApiSlice";
import ListView from "./ListView";
import Loader from "../../../components/Loader"

const Dashboard = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetSurveyorAssignmentQuery();

  return (
      <Box display={"flex"} justifyContent="center">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Snackbar open={isError}>
            <Alert severity="error">{"Error submitting data"}</Alert>
          </Snackbar>
        ) : (
          <ListView />
        )}
      </Box>
  );
};

export default Dashboard;