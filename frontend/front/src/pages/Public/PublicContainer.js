import React from "react";
import { ThemeProvider, Box, Stack } from "@mui/material";
import { theme } from "./Assets/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Survey from "./Pages/Survey";
import GetStarted from "./Pages/GetStarted";
import SpreadWorld from "./Pages/SpreadWorld";
import Faq from "./Pages/Faq";
import "./Assets/index.css";
import "animate.css/animate.min.css";

const PublicContainer = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box className="container-wrapper">
          <Stack
            direction="column"
            justifyContent="space-between"
            sx={{
              display: "flex",
              minHeight: "100vh",
              flexDirection: "column",
              color: "var(--color-text-1)",
              fontSize: "16px",
            }}
          >
            <Navbar />
            <Box>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/survey" element={<Survey />}></Route>
                <Route path="/getstarted" element={<GetStarted />}></Route>
                <Route path="/spreadtheworld" element={<SpreadWorld />}></Route>
                <Route path="/faq" element={<Faq />}></Route>
              </Routes>
            </Box>
            <Footer />
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default PublicContainer;
