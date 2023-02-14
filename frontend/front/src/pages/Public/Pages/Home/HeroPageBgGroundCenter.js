import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import imageHero from "../../../../assets/images/copywritingImages/EricRichards-volunteer-photo-4.jpg";
import ButtonGetPump from "../../Components/ButtonGetPump";
import AnimatedBox from "../../Components/AnimatedBox";

const HeroWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  position: "relative",
  backgroundImage: `url(${imageHero})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  "& .text-wrapper": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  "& .text-overlay": {
    color: "var(--color-text-2)",
    textShadow: "1px 1px 2px #000",
    margin: "0 auto",
    maxWidth: "1000px",
    background: "var(--accent-3)",
  },
}));

const HeroPageBgGroundCenter = ({ title, text, image }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 500);
  }, []);

  return (
    <HeroWrapper>
      <Box className="text-wrapper" px={4}>
        <AnimatedBox
          isMounted={isMounted}
          delay={400}
          animation="fadeInUp"
          className="text-overlay"
          p={2}
        >
          <Typography variant="titleHero">{title.toUpperCase()}</Typography>

          <Typography variant="bodyHero" mb={7}>
            {text}
          </Typography>

          <ButtonGetPump variant="getpump" />
        </AnimatedBox>
      </Box>
    </HeroWrapper>
  );
};

export default HeroPageBgGroundCenter;
