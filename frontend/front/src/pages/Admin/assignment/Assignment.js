import React from "react";

import { Box, Container, Typography } from "@mui/material";
import AssignTable from "./AssignTable";
import ContainerAdmin from "../component/ContainerAdmin";

const Assignment = () => {
  return (
    <ContainerAdmin name={"ASSIGNMENT"}>
      <AssignTable />
    </ContainerAdmin>
  );
};

export default Assignment;
