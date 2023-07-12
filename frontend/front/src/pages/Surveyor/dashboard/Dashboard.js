import { Box } from "@mui/material";
import CustomSnackbar from "../../../components/CustomSnackbar";
import ListView from "./ListView";
import Loader from "../../../components/Loader";
import React from "react";
import { useGetAssignmentsQuery } from "../../../api/apiSlice";

const Dashboard = () => {
  const { isLoading, isError } = useGetAssignmentsQuery();

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
