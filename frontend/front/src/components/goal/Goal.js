import { Grid, Box, Avatar, Typography } from "@mui/material";
import React from "react";

const Goal = (props) => {
  return (
    <Grid item xs={12} sm={6} md={3} my={2}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar></Avatar>
        <Typography variant="h5">{props.percentage}</Typography>
        <Typography>{props.info}</Typography>
      </Box>
    </Grid>
  );
};

export default Goal;
