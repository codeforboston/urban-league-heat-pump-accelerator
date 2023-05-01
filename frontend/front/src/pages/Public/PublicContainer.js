import React from "react";
import { ThemeProvider, Box, Stack } from "@mui/material";
import theme from "./Assets/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import { SurveyPage } from "./Pages/SurveyPage";
import GetInvolved from "./Pages/GetInvolved";
import Faq from "./Pages/Faq";
import BenefitsHeatPump from "./Pages/BenefitsHeatPump";
import GetHeatPump from "./Pages/GetHeatPump";
import AboutUs from "./Pages/AboutUs/AboutUs";
import AboutHeatPump from "./Pages/AboutHeatPump/AboutHeatPump";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import "./Assets/index.css";
import "animate.css/animate.min.css";
import ScrollToTopButton from "./Components/ScrollToTopButton";

const PublicContainer = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            color: "var(--color-text-3)",
            fontSize: "16px",
            background: "var(--bgColor-5)",
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
              <Route path="/faq" element={<Faq />} />
            </Routes>
          </Box>
          <ScrollToTopButton />
          <Footer />
        </Stack>
      </ThemeProvider>
    </>
  );
};

export default PublicContainer;
