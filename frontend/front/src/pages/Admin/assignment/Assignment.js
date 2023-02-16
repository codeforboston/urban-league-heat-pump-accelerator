import React from "react";

import { Box, Container, Typography } from "@mui/material";
import AssignTable from "./AssignTable";
import ContainerTitle from "../component/ContainerTitle";

const Assignment = () => {
  return (
    <ContainerTitle name={"ASSIGNMENT"}>
      <AssignTable />
    </ContainerTitle>
  );
};

export default Assignment;
