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
  paddingBottom: "2.75rem",
  clipPath: "polygon(0 10%,100% 0,100% 100%,0 100%)",
}));

const Home = () => {
  const [heroHeight, setHeroHeight] = useState("100vh");

  useEffect(() => {
    const handleResize = () => {
      setHeroHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Box>
      {/* HERO */}
      <Box sx={{ height: heroHeight }}>
        <CarrouselHero />
      </Box>
      <Container>
        {/* CARDS LINKS TO SURVEY AND ABOUT PAGES */}
        <Box mt={8}>
          <CardLinksSection />
        </Box>
      </Container>

      {/* TESTIMONIALS */}
      <SectionWrapper id="testimonial-section" my={16}>
        <Box variant="sectionBackground" sx={{ padding: { xs: "0" } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
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
