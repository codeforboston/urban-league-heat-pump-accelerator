import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Partners from "./Partners";
import CardBenefitsSection from "./CardBenefitsSection";
import CardLinksSection from "./CardLinksSection";

import surveyorImage from "../../../../assets/images/surveyor.jpg";
import imageTwo from "../../../../assets/images/heat-pump-outside-home.jpg";
import imageThree from "../../../../assets/images/home-exterior.jpg";
import imageLearnMore from "../../../../assets/images/image-learn-more.jpeg";
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
        <Box sx={{ padding: { xs: "0", lg: "0 128px" } }} mt={16}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="title1">Testimonials</Typography>
          </Box>
          <Testimonial />
        </Box>

        {/* CARDS BENEFITS */}
        <Box my={16}>
          <CardBenefitsSection
            cards={[
              {
                id: 1,
                title: "Save Money",
                paragraphs: [
                  "Heat pumps can reduce electricity usage for heating by up to 50% compared to electrical furnaces and baseboard heaters",
                  "Compare your current heating/cooling system and see how much money you could save.",
                ],
                image: imageTwo,
                imageRight: true,
                buttonText: "SAVINGS CALCULATOR",
                buttonLink: "/external-page",
              },
              {
                id: 2,
                title: "Improve Heating and Cooling",
                paragraphs: [
                  "Heat pumps are effective, continuous, nearly silent and extremely energy efficient.",
                  "Rather than provide blasts of hot or cold air, heat pumps provide continuous, low-level operation.",
                ],
                image: imageThree,
                imageRight: false,
                buttonText: "",
                buttonLink: "",
              },
              {
                id: 3,
                title: "Strengthen Community",
                paragraphs: [
                  "Switching to an Air Source Heat Pump can help long-time Boston residents stay in their homes.",
                  "Air Source Heat Pumps can lower utility costs and add important active cooling capacity in many homes that previously had none.",
                ],
                image: surveyorImage,
                imageRight: true,
                buttonText: "",
                buttonLink: "",
              },
              {
                id: 4,
                title: "Reduce Carbon Emissions",
                paragraphs: [
                  "Heat pumps are highly efficient heating and cooling systems. They become greener/cleaner as their electric power source shifts to lower/no-carbon generation.",
                  "Learn more about how Air Source Heat Pumps can reduce carbon footprint.",
                ],
                image: imageLearnMore,
                imageRight: false,
                buttonText: "CLEAN ENERGY GUIDE",
                buttonLink: "/external-page",
              },
            ]}
          />
        </Box>
        {/* PARTNERS LOGO */}
        <Box
          sx={{
            background: "var(--bgColor-11)",
            padding: { xs: "0", lg: "128px" },
          }}
        >
          <Partners />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
