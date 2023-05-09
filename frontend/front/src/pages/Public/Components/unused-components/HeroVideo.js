import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Link } from "@mui/material";

import ButtonGetPump from "../../Components/ButtonGetPump";

const HeroWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  height: "calc(100vh - 115px)",
  position: "relative",
  "& .text-wrapper": {
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    position: "absolute",
    boxSizing: "border-box",
  },
  "& .text-overlay": {
    textAlign: "center",
    zIndex: 1,
  },
  "& .video-background": {
    width: "100vw",
    height: "100vw",
    objectFit: "cover",
  },
}));

const VideoContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  left: 0,
  margin: "0 auto",
  height: "100%",
  width: "100%",
  opacity: 0.7,
  background: "var(--bgColor-5)",
  "& .component-video": {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  "& .component-video video": {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    objectFit: "cover",
  },
});

const HeroVideo = ({
  title,
  titleBold,
  text1,
  texBold,
  text2,
  videoBgGround,
}) => {
  return (
    <HeroWrapper sx={{ background: "var(--accent-3)" }}>
      <Box className="text-wrapper" px={4}>
        <Box className="text-overlay">
          <Box sx={{ textShadow: "1px 1px 2px #000" }}>
            <Typography variant="titleHero">
              {title.toUpperCase()}
              <span className="hero-title-bold">{titleBold.toUpperCase()}</span>
            </Typography>

            <Typography variant="bodyHero" mb={8} mt={2}>
              {text1}
              <Link
                href="https://www.masssave.com/residential/programs-and-services/income-based-offers/income-eligible-programs"
                target="_blank"
                rel="noopener"
                sx={{ color: "var(--color-text-5)", fontWeight: "800" }}
              >
                {texBold}
              </Link>
              {text2}
            </Typography>
          </Box>
          <ButtonGetPump variant="getpump" />
        </Box>
      </Box>

      <VideoContainer className="component-video">
        <video
          autoPlay
          loop
          muted
          src={videoBgGround}
          poster="../../../../assets/images/videoCover.png"
          className="video-background"
        />
      </VideoContainer>
    </HeroWrapper>
  );
};

export default HeroVideo;
