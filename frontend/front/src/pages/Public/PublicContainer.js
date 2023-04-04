import React from "react";
import { ThemeProvider, Box, Stack } from "@mui/material";
import { theme } from "./Assets/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import { SurveyPage } from "./Pages/SurveyPage";
import GetInvolved from "./Pages/GetInvolved";
import Faq from "./Pages/Faq";
import LearnMore from "./Pages/LearnMore";
import Testimonials from "./Pages/Testimonials";
import AboutUs from "./Pages/AboutUs/AboutUs";
import AboutHeatPump from "./Pages/AboutHeatPump";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import "./Assets/index.css";
import "animate.css/animate.min.css";
import ScrollToTopButton from "./Components/ScrollToTopButton";

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
              color: "var(--color-text-2)",
              fontSize: "16px",
            }}
          >
            <Navbar />
            <Box>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about-us" element={<AboutUs />}></Route>
                <Route path="/about-heat-pump" element={<AboutHeatPump />} />

                <Route path="/survey" element={<SurveyPage />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                <Route path="/learn-more" element={<LearnMore />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/faq" element={<Faq />} />
              </Routes>
            </Box>
            <ScrollToTopButton />
            <Footer />
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default PublicContainer;
