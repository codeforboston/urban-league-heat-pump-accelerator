import React from "react";
import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

// Created a custom loader, left the old one in case we want to use it again
const LoaderContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

function Loader() {
  return (
    <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
  );
}

export default Loader;
