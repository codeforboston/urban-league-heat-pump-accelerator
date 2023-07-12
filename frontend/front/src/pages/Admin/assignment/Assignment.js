import { Box, Button, Typography } from "@mui/material";

import AssignTable from "./AssignTable";
import ContainerTitle from "../component/ContainerTitle";
import CustomSnackbar from "../../../components/CustomSnackbar";
import Loader from "../../../components/Loader";
import React from "react";
import { useGetUnassignedIncompleteHomesQuery } from "../../../api/apiSlice";
import { useGoToBreadcrumb } from "../../../hooks/useGoToBreadcrumb";

const Assignment = () => {
  const goToBreadcrumb = useGoToBreadcrumb();

  const {
    data: unassignedIncompleteHomesData,
    isError: isUnassignedIncompleteHomesError,
    isLoading: isUnassignedIncompleteHomesDataLoading,
  } = useGetUnassignedIncompleteHomesQuery();

  const handleUnassignedLink = () =>
    goToBreadcrumb("unassigned", { url: "/admin/assignment/unassigned" });

  return isUnassignedIncompleteHomesDataLoading ? (
    <Loader />
  ) : isUnassignedIncompleteHomesError ? (
    <CustomSnackbar
      open={isUnassignedIncompleteHomesError}
      message="Error fetching unassigned homes data"
      severity="error"
    />
  ) : (
    <ContainerTitle name={"Assignments"}>
      <Box my={2}>
        <Button onClick={() => handleUnassignedLink()} variant={"outlined"}>
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
