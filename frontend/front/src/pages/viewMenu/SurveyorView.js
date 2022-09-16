import { Box, Button, Typography } from "@mui/material";
import React from "react";

const SurveyorView = () => {
  return (
    <Box my={3}>
      <Button variant={"contained"} sx={{ width: 350 }}>
        <Typography variant='h4'>Surveyor View</Typography>
      </Button>
    </Box>
  );
};

export default SurveyorView;
