import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const LinkButton = (props) => {
  return (
    <div>
      <Box m={3}>
        <Button color="inherit" component={Link} to={props.to}>
          <Box
            component={Paper}
            width={200}
            height={100}
            p={1}
            sx={{ bgcolor: "AliceBlue " }}
          >
            <Typography>{props.text}</Typography>
          </Box>
        </Button>
      </Box>
    </div>
  );
};

export default LinkButton;
