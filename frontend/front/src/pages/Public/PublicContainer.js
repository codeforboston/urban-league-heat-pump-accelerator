import React, { useState, useEffect } from "react";
import { ThemeProvider, Box, Stack } from "@mui/material";
import { responsiveTheme } from "./Assets/theme";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import { SurveyPage } from "./Pages/SurveyPage";
import GetInvolved from "./Pages/GetInvolved";
import GetHeatPump from "./Pages/GetHeatPump/GetHeatPump";
import BenefitsHeatPumps from "./Pages/BenefitsHeatPumps";
import AboutUs from "./Pages/AboutUs/AboutUs";
import AboutHeatPump from "./Pages/AboutHeatPump/AboutHeatPump";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import "./Assets/index.css";
import "animate.css/animate.min.css";
import ScrollToTopButton from "./Components/ScrollToTopButton";

const PublicContainer = () => {
  // Initialize language from localStorage or set to "en-us" by default
  const [lang, setLang] = useState(localStorage.getItem("langPref") || "en-us");
  // State to track if the page has been reloaded
  const [isReloaded, setIsReloaded] = useState(false);
  // Get the current location object from react-router
  const location = useLocation();

  // Log the current language whenever it changes
  useEffect(() => {
    console.log("lang", lang);
  }, [lang]);

  // Effect to handle language changes based on URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Get the language preference from the URL query parameter "langPref"
    let queryLang = params.get("langPref");

    // Check the current path
    const isPublicRoute = window.location.pathname.includes("/public");

    // If queryLang is not set, then set it to "en-us"
    if (!queryLang && isPublicRoute) {
      queryLang = localStorage.getItem("langPref") || "en-us";
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?langPref=${queryLang}`;
      window.history.replaceState({ path: newUrl }, "", newUrl);

      // If the page has not been reloaded yet, reload it once
      if (!isReloaded) {
        // Set isReloaded to true to avoid multiple reloads
        setIsReloaded(true);

        window.location.reload();
      }
    }

    // If it's the public route, remove langPref from the URL
    if (!isPublicRoute) {
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
      window.history.replaceState({ path: newUrl }, "", newUrl);
    }

    // If the language from the URL is different than the current state, update the state
    if (queryLang && queryLang !== lang) {
      setLang(queryLang);
    }

    localStorage.setItem("langPref", lang);
  }, [location.search, lang, isReloaded]);

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
                  element={<BenefitsHeatPumps />}
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
