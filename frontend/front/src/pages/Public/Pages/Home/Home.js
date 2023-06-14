import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import AnimatedBox from "../../Components/AnimatedBox";

import Partners from "./Partners";
import CardBenefitsSection from "./CardBenefitsSection";
import CardLinksSection from "./CardLinksSection";

import CarrouselHero from "./CarrouselHero";
import Testimonial from "./Testimonial";
import Heading1 from "../../Components/Typography/Heading1";

const SectionWrapper = styled(Box)(({ theme, image }) => ({
  background: "var(--bgColor-1)",
  paddingTop: "4em",
  paddingBottom: "4rem",
  clipPath: "polygon(0 10%,100% 0,100% 100%,0 100%)",
}));

const Home = () => {
  // const [heroHeight, setHeroHeight] = useState("calc(100vh-64px)");

  // useEffect(() => {
  //   const handleResize = () => {
  //     setHeroHeight(window.innerHeight);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 520px)",
      }}
    >
      {/* HERO */}
      {/* <Box sx={{ height: heroHeight }}> */}
      <Box>
        <CarrouselHero />
      </Box>
      <Container>
        {/* CARDS LINKS TO SURVEY AND ABOUT PAGES */}
        <Box mt={16}>
          <CardLinksSection />
        </Box>
      </Container>

      {/* TESTIMONIALS */}
      <SectionWrapper my={16} id="testimonial-section">
        <Box sx={{ padding: { xs: "0" }, height: "600px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
            id="testimonial-section"
          >
            <Heading1 text="Testimonials" />
          </Box>
          <AnimatedBox triggerOnce={false}>
            <Testimonial />
          </AnimatedBox>
        </Box>
      </SectionWrapper>

      {/* PARTNERS LOGO */}
      <Box id="our-partners-section">
        <Partners />
      </Box>

      {/* CARDS BENEFITS */}
      <Box
        mt={16}
        sx={{
          background: "var(--bgColor-3)",
        }}
      >
        <CardBenefitsSection />
      </Box>
    </Box>
  );
};

export default Home;
