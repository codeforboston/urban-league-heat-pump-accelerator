import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Contact from "./contact/Contact";
import About from "./about/About";
import Nav from "./nav/Nav";
import Footer from "./footer/Footer";
import { ClassNames } from "@emotion/react";

const PublicContainer = () => {
  return (
    <Box
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column'
      }}
    >
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='contact' element={<Contact />} ></Route>
        <Route path='about' element={<About />}></Route>
      </Routes>
      
      <Footer/>
    </Box>
  );
};

export default PublicContainer;
