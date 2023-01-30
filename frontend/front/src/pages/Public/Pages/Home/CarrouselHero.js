import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";
import HeroPage from "./HeroPage";
import imageHeroHouse from "../../../../assets/images/hero-house-heat-pump.png";

function CarrouselHero(props) {
  const items = [
    {
      component: (
        <HeroPage
          title="AN ENERGY-EFFICIENT SOLUTION FOR BOSTON RESIDENTS"
          text="Heat pumps are effective, continuous, nearly silent and extremely energy efficient."
          image={imageHeroHouse}
          backColor="var(--bgColor-1)"
        />
      ),
    },
    {
      component: (
        <HeroPage
          title="AN ENERGY-EFFICIENT SOLUTION FOR BOSTON RESIDENTS"
          text="Heat pumps are effective, continuous, nearly silent and extremely energy efficient."
          image={imageHeroHouse}
          backColor="var(--bgColor-3)"
        />
      ),
    },
    {
      component: (
        <HeroPage
          title="AN ENERGY-EFFICIENT SOLUTION FOR BOSTON RESIDENTS"
          text="Heat pumps are effective, continuous, nearly silent and extremely energy efficient."
          image={imageHeroHouse}
          backColor="var(--bgColor-4)"
        />
      ),
    },
    {
      component: (
        <HeroPage
          title="AN ENERGY-EFFICIENT SOLUTION FOR BOSTON RESIDENTS"
          text="Heat pumps are effective, continuous, nearly silent and extremely energy efficient."
          image={imageHeroHouse}
          backColor="var(--bgColor-6)"
        />
      ),
    },
  ];

  return (
    <div sx={{ height: "100vh" }}>
      <Carousel animation="fade" stopAutoPlayOnHover={false} interval="8000">
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
