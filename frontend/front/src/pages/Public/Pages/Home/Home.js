import React from "react";
import { Box, Container } from "@mui/material";
import CardHero from "../../Components/CardHero";
import Partners from "./Partners";
import CardBenefitsSection from "../../Components/CardBenefitsSection";
import CardLinksSection from "./CardLinksSection";

import surveyorImage from "../../../../assets/images/surveyor.jpg";
import imageTwo from "../../../../assets/images/heat-pump-outside-home.jpg";
import imageThree from "../../../../assets/images/home-exterior.jpg";
import imageHero from "../../../../assets/images/ulemhouse.png";
import imageHeroHouse from "../../../../assets/images/hero-house-heat-pump.svg";

import HeroPage from "./HeroPage";
const Home = () => {
  return (
    <Box sh={{ zIndex: "-1" }}>
      {/* HERO */}
      <HeroPage
        title="BOSTON RESIDENTS CAN BENEFIT FROM HEAT PUMPS"
        text="Heat pumps are effective, continuous, nearly silent and extremely energy efficient."
        image={imageHeroHouse}
      />

      {/* <CardHero
        title="Boston Residents Can Benefit From Heat Pumps"
        paragraphs={[
          "Heat pumps are effective, continuous, nearly silent and extremely energy efficient.",
        ]}
        image={imageHero}
      /> */}
      <Container>
        {/* CARDS LINKS TO SURVEY AND ABOUT PAGES */}
        <Box my={15}>
          <CardLinksSection />
        </Box>

        {/* PARTNERS LOGO */}
        <Box my={15}>
          <Partners />
        </Box>

        {/* CARDS BENEFITS */}
        <Box my={15}>
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
                image: imageTwo,
                imageRight: false,
                buttonText: "CLEAN ENERGY GUIDE",
                buttonLink: "/external-page",
              },
            ]}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
