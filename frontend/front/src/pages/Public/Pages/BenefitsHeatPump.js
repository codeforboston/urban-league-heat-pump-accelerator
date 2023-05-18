import React from "react";
import { Box, Typography } from "@mui/material";

const LearnMore = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 560px)",
      }}
    >
      <Typography variant="h4" mb={3} textAlign="center">
        Benefits Heat Pump
      </Typography>
    </Box>
  );
};

export default LearnMore;
