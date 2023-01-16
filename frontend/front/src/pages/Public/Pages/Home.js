import React from "react";
import { Box, Container } from "@mui/material";
import CardHero from "../Components/CardHero";
import CardBenefitsReusable from "../Components/CardBenefitsReusable";
import surveyorImage from "../../../assets/images/surveyor.jpg";
import imageTwo from "../../../assets/images/heat-pump-outside-home.jpg";
import imageThree from "../../../assets/images/home-exterior.jpg";
import imageHero from "../../../assets/images/ulemhouse.png";

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

      {/* CARDS BENEFITS */}
      <Container>
        {/* 1. Section image right + button */}
        <CardBenefitsReusable
          title="Save Money"
          paragraphs={[
            "Heat pumps can reduce electricity usage for heating by up to 50% compared to electrical furnaces and baseboard heaters",
            "Compare your current heating/cooling system and see how much money you could save.",
          ]}
          image={imageTwo}
          imageRight={true}
          buttonText="SAVINGS CALCULATOR"
          buttonLink="/external-page"
        />

        {/* 2. Section image left */}
        <CardBenefitsReusable
          title="Improve Heating and Coolin"
          paragraphs={[
            "Heat pumps are effective, continuous, nearly silent and extremely energy efficient.",
            "Rather than provide blasts of hot or cold air, heat pumps provide continuous, low-level operation.",
          ]}
          image={imageThree}
          imageRight={false}
          buttonText=""
          buttonLink=""
        />

        {/* 3. Section image right - button  */}
        <CardBenefitsReusable
          title="Strengthen Community"
          paragraphs={[
            "Switching to an Air Source Heat Pump can help long-time Boston residents stay in their homes.",
            "Air Source Heat Pumps can lower utility costs and add important active cooling capacity in many homes that previously had none.",
          ]}
          image={surveyorImage}
          imageRight={true}
          buttonText=""
          buttonLink=""
        />

        {/* 4. Section image left + button */}
        <CardBenefitsReusable
          title="Reduce Carbon Emissions"
          paragraphs={[
            "Heat pumps are highly efficient heating and cooling systems. They become greener/cleaner as their electric power source shifts to lower/no-carbon generation.",
            "Learn more about how Air Source Heat Pumps can reduce carbon footprint.",
          ]}
          image={imageTwo}
          imageRight={false}
          buttonText="CLEAN ENERGY GUIDE"
          buttonLink="/external-page"
        />
      </Container>
    </Box>
  );
};

export default Home;
