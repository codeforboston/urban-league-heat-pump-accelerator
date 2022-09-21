import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Testing1 from "./Testing1";
import Testing2 from "./Testing2";

const DevContainer = () => {
  return (
    <Box>
      <Typography>Naviagation Wrapper</Typography>
      <Nav />
      <Container>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='testing1' element={<Testing1 />}></Route>
          <Route path='testing2' element={<Testing2 />}></Route>
        </Routes>
      </Container>
    </Box>
  );
};

export default DevContainer;
