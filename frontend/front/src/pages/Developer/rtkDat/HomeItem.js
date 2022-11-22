import { Box, Button, Typography } from "@mui/material";
import React from "react";

const HomeItem = (props) => {
  return (
    <Box p={2}>
      <Typography>id: {props.data.id}</Typography>
      <Typography>address: {props.data.address}</Typography>
      <Typography>zipcode: {props.data.zipcode}</Typography>
      <Typography>completed: {props.data.completed ? "yes" : "no"}</Typography>
      <Typography>surveyor: {props.data.surveyor}</Typography>
    </Box>
  );
};

export default HomeItem;
