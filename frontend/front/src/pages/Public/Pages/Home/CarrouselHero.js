import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";
import HeroPage from "./HeroPage";
import imageHeroHouse from "../../../../assets/images/hero-house-heat-pump.png";
import imageHero from "../../../../assets/images/copywritingImages/EricRichards-volunteer-photo-4.jpg";
import HeroVideo from "./HeroVideo";
import videoBgGround from "../../../../assets/images/productionID_4791180.mp4";
import HeroPageBgGroundCenter from "./HeroPageBgGroundCenter";

function CarrouselHero(props) {
  const items = [
    {
      component: (
        <HeroPage
          title="BOSTON RESIDENTS CAN "
          titleBold="BENEFIT FROM HEAT PUMPS"
          text="Heat pumps are effective, continuous, nearly silent and extremely energy efficient."
          image={imageHeroHouse}
          backColor="var(--bgColor-1)"
        />
      ),
    },
    {
      component: (
        <HeroPageBgGroundCenter
          title="BOSTON RESIDENTS CAN "
          titleBold="BENEFIT FROM HEAT PUMPS"
          text="Heat pumps are effective, continuous, nearly silent and extremely energy efficient."
          image={imageHero}
          backColor="var(--bgColor-1)"
        />
      ),
    },
    {
      component: (
        <HeroVideo
          title="Boston Residents Can "
          titleBold="Save Money with Heat Pumps"
          text1="Heat pumps can help you "
          textBold="save money"
          text2=" on your home heating and cooling costs."
          videoBgGround={videoBgGround}
        />
      ),
    },
  ];

  return (
    <div sx={{ height: "100vh", minHeight: "100vh" }}>
      <Carousel
        animation="fade"
        stopAutoPlayOnHover={false}
        interval="8000"
        indicators={false}
        // autoPlay={false}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} alt={item.alt} />
        ))}
      </Carousel>
    </div>
  );
}

function Item(props) {
  return (
    <Paper>
      <Box>{props.item.component}</Box>
    </Paper>
  );
}

export default CarrouselHero;
