import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";
import imageHeroFirst from "../../../../assets/images/copywritingImages/Eric-Richards-unedited-3-EDITED.webp";
// import imageHeroSecond from "../../../../assets/images/copywritingImages/EricRichards-volunteer-photo-4.webp";
import HeroPage from "./HeroPage";

function CarrouselHero(props) {
  const [heroHeight, setHeroHeight] = useState("calc(100vh - 343px)");

  useEffect(() => {
    const handleResize = () => {
      setHeroHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const items = [
    {
      component: (
        <HeroPage
          title="Save money on your "
          titleBold="heating and cooling bills"
          text1="You may be able to get incentives to install a heat pump, a type of heating and cooling system that will  "
          textBold="lower your utility bills"
          text2="."
          image={imageHeroFirst}
          link="https://www.cenhud.com/en/my-energy/save-energy-money/energy-calculators/fuel-switching-calculator/"
        />
      ),
    },
    //   component: (
    //     <HeroPage
    //       title="Boston Residents Can "
    //       titleBold="Save Money with Heat Pumps"
    //       text1="Make your home heating and cooling "
    //       textBold="less costly"
    //       text2="."
    //       image={imageHeroFirst}
    //       link="https://www.cenhud.com/en/my-energy/save-energy-money/energy-calculators/fuel-switching-calculator/"
    //     />
    //   ),
    // },
    // {
    //   component: (
    //     <HeroPage
    //       title="BOSTON RESIDENTS CAN "
    //       titleBold="BENEFIT FROM HEAT PUMPS"
    //       text1="Heat pumps are effective, continuous, nearly silent and extremely energy efficient."
    //       image={imageHeroSecond}
    //       backColor="var(--bgColor-1)"
    //     />
    //   ),
    // },
  ];

  return (
    <div>
      <Carousel
        animation="fade"
        stopAutoPlayOnHover={false}
        interval="8000"
        indicators={false}
        cycleNavigation={false}
        autoPlay={false}
        styles={{
          height: { heroHeight },
          minHeight: "100vh",
          position: "absolute",
        }}
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
