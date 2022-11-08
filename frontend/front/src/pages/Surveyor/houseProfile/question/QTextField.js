import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const QTextField = (props) => {
  return (
    <Box mt={2}>
      <Box>
        <Typography>{props.question}</Typography>
      </Box>
      <Box pt={1}>
        <TextField
          id='outlined-basic'
          // label='Outlined'
          variant='outlined'
          sx={{ bgcolor: "white", border: 1, width: "100%" }}
        />
      </Box>
    </Box>
  );
};

export default QTextField;
