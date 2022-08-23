import React from "react";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

const About = () => {
  const { title } = useSelector((state) => state.about);

  console.log(title);
  return (
    <Box p={1} m={1}>
      <Typography variant='h2'>{title} </Typography>
    </Box>
  );
};

export default About;
