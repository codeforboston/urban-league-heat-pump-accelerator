import { Box, Button, Typography } from "@mui/material";
import React from "react";

const PublicView = () => {
  return (
    <Box my={3}>
      <Button variant={"contained"} sx={{ width: 350 }}>
        <Typography variant='h4'>Public View</Typography>
      </Button>
    </Box>
  );
};

export default PublicView;
