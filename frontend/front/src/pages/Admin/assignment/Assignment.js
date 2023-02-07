import React from "react";

import { Box } from "@mui/material";
import AssignTable from "./AssignTable";

const Assignment = () => {
  return (
    <Box mt={4}>
      <Box>{/* <Typography variant="h3">Clusters</Typography> */}</Box>
      <AssignTable />
    </Box>
  );
};

export default Assignment;
