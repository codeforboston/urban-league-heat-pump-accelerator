import { Box, Button, Container, Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";

import ConfirmationTest from "./confirmModal/ConfirmationTest";
import Contact from "./contact/Contact";
import Home from "./home/Home";
import Map from "./googlemap/Map";
import Nav from "./nav/Nav";
import React from "react";
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
          <Route path="contact" element={<Contact />}></Route>
          <Route path="rtkq" element={<RtkTesting />}></Route>

          <Route path="confirmation" element={<ConfirmationTest />}></Route>
          <Route path="map" element={<Map />}></Route>
        </Routes>
      </Container>
    </Box>
  );
};

export default DevContainer;
