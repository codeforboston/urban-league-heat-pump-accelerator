import React from "react";

import { Box, Button, Typography } from "@mui/material";
import AssignTable from "./AssignTable";
import ContainerTitle from "../component/ContainerTitle";

import { Link } from "react-router-dom";
import { useGetUnassignedIncompleteHomesQuery } from "../../../api/apiSlice";
import Loader from "../../../components/Loader";
import CustomSnackbar from "../../../components/CustomSnackbar";

const Assignment = () => {
  const {
    data: unassignedIncompleteHomesData,
    isError: isUnassignedIncompleteHomesError,
    isLoading: isUnassignedIncompleteHomesDataLoading,
  } = useGetUnassignedIncompleteHomesQuery();

  return isUnassignedIncompleteHomesDataLoading ? (
    <Loader />
  ) : isUnassignedIncompleteHomesError ? (
    <CustomSnackbar
      open={isUnassignedIncompleteHomesError}
      message="Error fetching unassigned homes data"
      severity="error"
    />
  ) : (
    <ContainerTitle name={"ASSIGNMENT"}>
      <Box my={2}>
        <Button component={Link} to={"unassigned"} variant={"outlined"}>
          <Typography variant="h6">
            Unassigned Homes: {unassignedIncompleteHomesData.length}
          </Typography>
        </Button>
      </Box>
      <AssignTable />
    </ContainerTitle>
  );
};

export default Assignment;
