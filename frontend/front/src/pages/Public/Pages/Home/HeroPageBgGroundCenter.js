import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Link } from "@mui/material";
// import imageHero from "../../../../assets/images/copywritingImages/EricRichards-volunteer-photo-4.jpg";
import ButtonGetPump from "../../Components/ButtonGetPump";
import AnimatedBox from "../../Components/AnimatedBox";

const HeroWrapper = styled("div")(({ theme, image }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  position: "relative",
  backgroundImage: `url(${image})`,
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

const HeroPageBgGroundCenter = ({
  title,
  titleBold,
  text1,
  textBold,
  link,
  text2,
  image,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 500);
  }, []);

  return (
    <HeroWrapper image={image}>
      <Box className="text-wrapper" px={4}>
        <AnimatedBox
          isMounted={isMounted}
          delay={400}
          animation="fadeInUp"
          className="text-overlay"
          p={2}
        >
          <Typography variant="titleHero">
            {title.toUpperCase()}
            <span className="hero-title-bold">{titleBold.toUpperCase()}</span>
          </Typography>

          <Typography variant="bodyHero" mb={8} mt={2}>
            {text1}
            {link !== "" && (
              <Link
                href={link} // fix: use {link} variable, not the string "link"
                target="_blank"
                rel="noopener"
                sx={{ color: "var(--color-text-5)", fontWeight: "800" }}
              >
                {textBold}
              </Link>
            )}
            {text2}
          </Typography>

          <ButtonGetPump variant="getpump" />
        </AnimatedBox>
      </Box>
    </HeroWrapper>
  );
};

export default HeroPageBgGroundCenter;
