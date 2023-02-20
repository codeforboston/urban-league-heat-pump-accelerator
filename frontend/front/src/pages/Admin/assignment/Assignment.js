import React from "react";

import {
  Box,
  Button,

  Typography,
} from "@mui/material";
import AssignTable from "./AssignTable";
import ContainerTitle from "../component/ContainerTitle";

import { Link } from "react-router-dom";

const Assignment = () => {

  return (
    <ContainerTitle name={"ASSIGNMENT"}>
      <Box my={2}>
        <Button component={Link} to={"unassigned"} variant={"outlined"}>
          <Typography variant="h6">Unassigned Homes: 10</Typography>
        </Button>
      </Box>
      <AssignTable />
    </ContainerTitle>
  );
};

export default Assignment;
