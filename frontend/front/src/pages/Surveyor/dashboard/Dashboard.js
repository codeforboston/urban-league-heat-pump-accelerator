import { Box, Button, Grid, Typography, CircularProgress} from "@mui/material";
import React from "react";
import { useGetAssignmentsQuery } from "../../../api/apiSlice";
import ListView from "./ListView";
import Loader from "../../../components/Loader"
import CustomSnackbar from "../../../components/CustomSnackbar"

const Dashboard = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetAssignmentsQuery();

  return (
      <Box display={"flex"} justifyContent="center">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <CustomSnackbar
            open={isError}
            message="Error fetching surveyor assignment data"
            severity="error"
          />
        ) : (
          <ListView />
        )}
      </Box>
  );
};

export default Dashboard;