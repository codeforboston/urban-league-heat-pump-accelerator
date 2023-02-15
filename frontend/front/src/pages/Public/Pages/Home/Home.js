import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Partners from "./Partners";
import CardBenefitsSection from "./CardBenefitsSection";
import CardLinksSection from "./CardLinksSection";

import imageTwo from "../../../../assets/images/heat-pump-outside-home.jpg";
import liveMoreCom from "../../../../assets/images/copywritingImages/liveMoreCom.jpg";
import strengthenCommunity from "../../../../assets/images/copywritingImages/StrengthenCommunity.jpg";
import beEnvironmentally from "../../../../assets/images/copywritingImages/beEnvironmentally.jpg";

import CarrouselHero from "./CarrouselHero";
import Testimonial from "./Testimonial";

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

        {/* TESTIMONIALS */}
        <Box sx={{ padding: { xs: "0" } }} mt={16}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="title1">Testimonials</Typography>
          </Box>
          <Testimonial />
        </Box>

        {/* PARTNERS LOGO */}
        <Box
          sx={{
            background: "var(--bgColor-11)",
            padding: { xs: "0", lg: "64px 128px 64px 128px" },
          }}
        >
          <Partners />
        </Box>
        {/* CARDS BENEFITS */}
        <Box mt={16}>
          <CardBenefitsSection
            cards={[
              {
                id: 1,
                title: "Live More Comfortably",
                paragraphs: [
                  "Heat pumps can help you keep cool in summer and keep warm in winter. They are nearly silent, work continuously, and are reliable.",
                ],
                image: liveMoreCom,
                // buttonText: "SAVINGS CALCULATOR",
                // buttonLink: "/external-page",
              },
              {
                id: 2,
                title: "Improve Heating and Cooling",
                paragraphs: [
                  "Heat pumps are effective, continuous, nearly silent and extremely energy efficient. Rather than provide blasts of hot or cold air, heat pumps provide continuous, low-level operation.",
                ],
                image: imageTwo,
                buttonText: "",
                buttonLink: "",
              },
              {
                id: 3,
                title: "Strengthen Community",
                paragraphs: [
                  "Because heat pumps can lower your utility bills, they can help seniors and low-income residents stay in their homes longer.",
                ],
                image: strengthenCommunity,
                buttonText: "",
                buttonLink: "",
              },
              {
                id: 4,
                title: "Be Environmentally Friendly",
                paragraphs: [
                  "To help address climate change, we all need to reduce our greenhouse gas emissions. Heat pumps can help because they are powered by electricity rather than fossil fuels. Because they handle both cooling and heating, you can have one rather than two systems for a comfortable home.",
                ],
                image: beEnvironmentally,
                // buttonText: "CLEAN ENERGY GUIDE",
                // buttonLink: "/external-page",
              },
            ]}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
