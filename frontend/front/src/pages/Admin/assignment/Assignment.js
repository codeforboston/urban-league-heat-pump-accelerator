import React from "react";

import { Box, Button, Typography } from "@mui/material";
import AssignTable from "./AssignTable";
import ContainerTitle from "../component/ContainerTitle";

import { Link } from "react-router-dom";
import { useGetUnassignedHomesQuery } from "../../../api/apiSlice";
import Loader from "../../../components/Loader";
import CustomSnackbar from "../../../components/CustomSnackbar";

const Assignment = () => {
  const {
    data: unassignedHomesData,
    isError: isUnassignedHomesError,
    isLoading: isUnassignedHomesDataLoading,
  } = useGetUnassignedHomesQuery();

  return isUnassignedHomesDataLoading ? (
    <Loader />
  ) : isUnassignedHomesError ? (
    <CustomSnackbar
      open={isUnassignedHomesError}
      message="Error fetching unassigned homes data"
      severity="error"
    />
  ) : (
    <ContainerTitle name={"ASSIGNMENT"}>
      <Box my={2}>
        <Button component={Link} to={"unassigned"} variant={"outlined"}>
          <Typography variant="h6">
            Unassigned Homes: {unassignedHomesData.length}
          </Typography>
        </Button>
      </Box>
      <AssignTable />
    </ContainerTitle>
  );
};

export default Assignment;
