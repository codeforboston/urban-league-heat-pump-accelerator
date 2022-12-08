import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const PublicContainer = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Box>
  );
};

export default PublicContainer;
