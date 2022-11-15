import { Box, Typography } from "@mui/material";
import React from "react";

const HomeItem = (props) => {
  return (
    <Box p={2}>
      <Typography>id: {props.data.id}</Typography>
      <Typography>firstName: {props.data.firstName}</Typography>
      <Typography>lastName: {props.data.lastName}</Typography>
      <Typography>email: {props.data.email}</Typography>
      <Typography>phone: {props.data.phone}</Typography>
      <Typography>streetNumber: {props.data.streetNumber}</Typography>
      <Typography>streetName: {props.data.streetName}</Typography>
      <Typography>city: {props.data.city}</Typography>
      <Typography>role: {props.data.role}</Typography>
      <Typography>status: {props.data.status}</Typography>
    </Box>
  );
};

export default HomeItem;
