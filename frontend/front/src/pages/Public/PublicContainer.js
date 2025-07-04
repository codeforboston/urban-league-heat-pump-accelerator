import React from "react";
import { ThemeProvider, Box, Stack } from "@mui/material";
import { responsiveTheme } from "./Assets/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import AboutUs from "./Pages/AboutUs/AboutUs";
import AboutHeatPump from "./Pages/AboutHeatPump/AboutHeatPump";
import BenefitsHeatPumps from "./Pages/BenefitsHeatPumps";
import ForRenters from "./Pages/ForRenters";
import GetInvolved from "./Pages/GetInvolved";
import GetHeatPump from "./Pages/GetHeatPump";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import { SurveyPage } from "./Pages/SurveyPage";
import "./Assets/index.css";
import "animate.css/animate.min.css";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import "./Libs/i18n";
import { LanguageLogger } from "../../features/newrelic/LanguageLogger";

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
            <LanguageLogger />
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
                <Route path="/for-renters" element={<ForRenters />} />
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
