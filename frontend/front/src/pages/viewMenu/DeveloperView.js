import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const DeveloperView = (props) => {
  return (
    <Box my={3}>
      <Button
        variant={"contained"}
        sx={{ width: 350 }}
        component={Link}
        to={props.link}
      >
        <Typography variant="h4">Developer View</Typography>
      </Button>
    </Box>
  );
};

export default DeveloperView;
