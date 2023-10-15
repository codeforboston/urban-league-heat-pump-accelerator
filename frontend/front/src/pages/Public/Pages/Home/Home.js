import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Partners from "./Partners";
import CardBenefitsSection from "./CardBenefitsSection";
import CardLinksSection from "./CardLinksSection";
import Testimonial from "./Testimonial";
import HeroPage from "./HeroPage";
import imageHeroFirst from "../../../../assets/images/copywritingImages/Eric-Richards-unedited-3-EDITED.webp";

const SectionWrapper = styled(Box)(({ theme, image }) => ({
  background: "var(--bgColor-1)",
  paddingTop: "4em",
  paddingBottom: "4rem",
}));

const Home = () => {
  const { t } = useTranslation();

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
        <HeroPage
          title={t("public.home.hero.title")}
          titleBold={t("public.home.hero.titleBold")}
          text1={t("public.home.hero.text1")}
          textBold={t("public.home.hero.link")}
          text2={t("public.home.hero.text2")}
          image={imageHeroFirst}
          link="https://www.cenhud.com/en/my-energy/save-energy-money/energy-calculators/fuel-switching-calculator/"
        />
      </Box>
      <Container>
        {/* CARDS LINKS TO SURVEY AND ABOUT PAGES */}
        <Box mt={16}>
          <CardLinksSection />
        </Box>
      </Container>

      {/* TESTIMONIALS */}
      <SectionWrapper mt={16} id="testimonial-section">
        <Box sx={{ padding: { xs: "0" } }}>
          <Testimonial />
        </Box>
      </SectionWrapper>

      {/* CARDS BENEFITS */}
      <Box
        sx={{
          background: "var(--bgColor-3)",
          pt: 12,
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
