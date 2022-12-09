import React from "react";
import { ThemeProvider, Box, Stack } from "@mui/material";
import { theme } from "./theme";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const PublicContainer = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box>
          <Stack direction="column" spacing={2} justifyContent="space-between">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
            </Routes>
            <Footer />
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default PublicContainer;
