import { Box, Container, Typography } from "@mui/material";
import React from "react";

const ContainerTitle = (props) => {
  return (
    <Container style={{ maxWidth: 2000 }}>
      <Box display="flex" justifyContent="center" alignItems="center" m={5}>
        <Typography variant="h3">{props.name}</Typography>
      </Box>

      {props.children}
    </Container>
  );
};

export default ContainerTitle;
