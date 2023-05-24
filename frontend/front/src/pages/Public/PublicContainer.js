import React from "react";
import { ThemeProvider, Box, Stack } from "@mui/material";
import { responsiveTheme } from "./Assets/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import { SurveyPage } from "./Pages/SurveyPage";
import GetInvolved from "./Pages/GetInvolved";
import BenefitsHeatPump from "./Pages/BenefitsHeatPump";
import GetHeatPump from "./Pages/GetHeatPump/GetHeatPump";
import AboutUs from "./Pages/AboutUs/AboutUs";
import AboutHeatPump from "./Pages/AboutHeatPump/AboutHeatPump";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import "./Assets/index.css";
import "animate.css/animate.min.css";
import ScrollToTopButton from "./Components/ScrollToTopButton";

const PublicContainer = () => {
  return (
    <>
      <ThemeProvider theme={responsiveTheme}>
        <Box className="container-wrapper">
          <Stack
            direction="column"
            justifyContent="space-between"
            sx={{
              display: "flex",
              minHeight: "100vh",
              flexDirection: "column",
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
                <Route path="/get-heat-pump" element={<GetHeatPump />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                <Route
                  path="/benefits-heat-pump"
                  element={<BenefitsHeatPump />}
                />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
