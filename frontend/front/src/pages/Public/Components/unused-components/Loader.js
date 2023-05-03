import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import heatPumpFan from "../../../assets/images/fan-heat-pumpSM.png";

const ImageAnimation = styled("div")(({ theme }) => ({
  "& .home-hero-fan": {
    left: "50%",
    top: "50%",
    bottom: "50%",
    position: "absolute",
    transform: "translate(-50%,-50%)",
    animation: "fanHero 1.5s infinite linear",
    zIndex: "1",
  },
  [theme.breakpoints.up("xs")]: {
    "& .home-hero-fan": {
      marginLeft: "-1%",
    },
  },
  [theme.breakpoints.up("sm")]: {
    "& .home-hero-fan": {
      marginLeft: "0%",
    },
  },
}));
function Loader() {
  return (
    <ImageAnimation>
      <Box
        component="img"
        src={heatPumpFan}
        alt="heat-pump-fan"
        className="home-hero-fan"
      ></Box>
    </ImageAnimation>
  );
}

export default Loader;
