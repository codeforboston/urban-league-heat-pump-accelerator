import React from "react";
import { ThemeProvider, Box, Stack } from "@mui/material";
import { theme } from "./theme";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";

const PublicContainer = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box>
          <Stack
            direction="column"
            spacing={2}
            justifyContent="space-between"
            style={{
              display: "flex",
              minHeight: "100vh",
              flexDirection: "column",
            }}
          >
            <Navbar />
            <Box>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/about" element={<About />}></Route>
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
