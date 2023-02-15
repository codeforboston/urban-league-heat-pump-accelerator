import { Container } from "@mui/material";
import React from "react";

const ContainerAdmin = (props) => {
  return <Container style={{ maxWidth: 2000 }}>{props.children}</Container>;
};

export default ContainerAdmin;
