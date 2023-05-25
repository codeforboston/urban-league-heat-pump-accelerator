import React from "react";
import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

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
