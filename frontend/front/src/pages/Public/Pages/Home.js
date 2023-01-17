import React from "react";
import { Box, Container, Typography } from "@mui/material";
import CardHero from "../Components/CardHero";
import Partners from "../Components/Partners";
import CardBenefitsSection from "../Components/CardBenefitsSection";
import CardLinksSection from "../Components/CardLinksSection";

import surveyorImage from "../../../assets/images/surveyor.jpg";
import imageTwo from "../../../assets/images/heat-pump-outside-home.jpg";
import imageThree from "../../../assets/images/home-exterior.jpg";
import imageHero from "../../../assets/images/ulemhouse.png";
import ulemLogo from "../../../assets/images/ULEM.png";
import maCleanEnergyLogo from "../../../assets/images/MACleanEnergy.png";
import heatSmartLogo from "../../../assets/images/HeatSmart.png";
import codeForAmericaLogo from "../../../assets/images/CFA.png";
import codeForBostonLogo from "../../../assets/images/CFB.png";

const Home = () => {
  return (
    <Box>
      {/* HERO */}
      <CardHero
        title="Boston Residents Can Benefit From Heat Pumps"
        paragraphs={[
          " Heat pumps are effective, continuous, nearly silent and extremely energy efficient.",
        ]}
        image={imageHero}
      />
      <Container>
        {/* CARDS LINKS TO SURVEY AND ABOUT PAGES */}
        <CardLinksSection />

        {/* PARTNERS LOGO */}
        <Partners
          title="Our Partners"
          width="150px"
          partners={[
            {
              id: 1,
              logo: ulemLogo,
              name: "Urban League of Eastern Massachusetts (ULEM)",
              link: "https://www.ulem.org/",
            },
            {
              id: 2,
              logo: maCleanEnergyLogo,
              name: "Massachusetts Clean Energy Center",
              link: "https://www.masscec.com/",
            },
            {
              id: 3,
              logo: heatSmartLogo,
              name: "HeatSmart Alliance",
              link: "https://heatsmartalliance.org/",
            },
            {
              id: 4,
              logo: codeForAmericaLogo,
              name: "Code For America",
              link: "https://codeforamerica.org/",
            },
            {
              id: 5,
              logo: codeForBostonLogo,
              name: "Code For Boston",
              link: "https://www.codeforboston.org/",
            },
          ]}
        />
        {/* CARDS BENEFITS */}
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
              title: "Improve Heating and Coolin",
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
      </Container>
    </Box>
  );
};

export default Home;
