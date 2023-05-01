import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import Partners from "./Partners";
import CardBenefitsSection from "./CardBenefitsSection";
import CardLinksSection from "./CardLinksSection";

import CarrouselHero from "./CarrouselHero";
import Testimonial from "./Testimonial";

const SectionWrapper = styled(Box)(({ theme, image }) => ({
  background: "var(--bgColor-1)",
  paddingTop: "4em",
  paddingBottom: "2.75rem",
  clipPath: "polygon(0 10%,100% 0,100% 100%,0 100%)",
}));

const Home = () => {
  return (
    <Box>
      {/* HERO */}
      <CarrouselHero />
      <Container>
        {/* CARDS LINKS TO SURVEY AND ABOUT PAGES */}
        <Box mt={16}>
          <CardLinksSection />
        </Box>
      </Container>

      {/* TESTIMONIALS */}
      <SectionWrapper id="testimonial-section" my={16}>
        <Box variant="sectionBackground" sx={{ padding: { xs: "0" } }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" pt={4}>
              Testimonials
            </Typography>
          </Box>
          <Testimonial />
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
