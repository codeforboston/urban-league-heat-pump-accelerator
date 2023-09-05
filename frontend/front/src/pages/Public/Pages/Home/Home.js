import React from "react";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Partners from "./Partners";
import CardBenefitsSection from "./CardBenefitsSection";
import CardLinksSection from "./CardLinksSection";
import CarrouselHero from "./CarrouselHero";
import Testimonial from "./Testimonial";

const SectionWrapper = styled(Box)(({ theme, image }) => ({
  background: "var(--bgColor-1)",
  paddingTop: "4em",
  paddingBottom: "4rem",
}));

const Home = () => {
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
        <Box sx={{ padding: { xs: "0" } }}>
          <Testimonial />
        </Box>
      </SectionWrapper>

      {/* CARDS BENEFITS */}
      <Box
        mt={16}
        sx={{
          background: "var(--bgColor-3)",
        }}
      >
        <CardBenefitsSection />
      </Box>

      {/* PARTNERS LOGO */}
      <Box id="our-partners-section">
        <Box mb={8} mt={8} sx={{ padding: { xs: "0" } }}>
          <Partners />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
