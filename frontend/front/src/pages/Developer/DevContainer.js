import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./home/Home";
import Nav from "./nav/Nav";
import About from "./about/About";
import Contact from "./contact/Contact";
import { ReduxTKQuery } from "./rtkq/ReduxTKQuery";

import ConfirmationTest from "./confirmModal/ConfirmationTest"
import RtkTesting from "./rtkDat/RtkTesting";

const DevContainer = () => {
  return (
    <Box>
      <Button color="inherit" component={Link} to="/">
        <Typography>selection menu</Typography>
      </Button>
      <Nav />
      <Container>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="rtkq" element={<RtkTesting />}></Route>

          <Route path="confirmation" element={<ConfirmationTest />}></Route>
        </Routes>
      </Container>
    </Box>
  );
};

export default DevContainer;
