import React from "react";

import { Box, Container, Typography } from "@mui/material";
import AssignTable from "./AssignTable";

const Assignment = () => {
  return (
    <Container style={{ maxWidth: 2000 }}>
      <Box mt={4}>
        <Box display="flex" justifyContent="center" alignItems="center" m={3}>
          <Typography variant="h3">ASSIGNMENT</Typography>
        </Box>
        <AssignTable />
      </Box>
    </Container>
  );
};

export default Assignment;
