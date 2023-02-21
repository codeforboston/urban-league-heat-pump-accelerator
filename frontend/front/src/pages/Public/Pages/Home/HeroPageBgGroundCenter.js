import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Link } from "@mui/material";
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
    color: "var(--color-text-8)",
    textShadow: "1px 1px 2px #000",
    margin: "0 auto",
    maxWidth: "800px",
    borderRadius: "10px",
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
  return (
    <HeroWrapper image={image}>
      <Box className="text-wrapper">
        <AnimatedBox triggerOnce={false}>
          <Box className="text-overlay" py={2}>
            <Typography variant="titleHero">
              {title.toUpperCase()}
              <Typography variant="titleHeroBold">
                {titleBold.toUpperCase()}
              </Typography>
            </Typography>

            <Typography variant="bodyHero" mb={8} mt={6}>
              {text1}
              {link !== "" && (
                <Link
                  href={link} // fix: use {link} variable, not the string "link"
                  target="_blank"
                  rel="noopener"
                  underline="always"
                  sx={{
                    color: "var(--color-text-8)",
                    fontWeight: "var(--font-weight-2)",
                    textDecoration: "solid underline 4px",
                    textUnderlinePosition: "under",
                  }}
                >
                  {textBold}
                </Link>
              )}
              {text2}
            </Typography>

            <ButtonGetPump variant="getpump" />
          </Box>
        </AnimatedBox>
      </Box>
    </HeroWrapper>
  );
};

export default HeroPageBgGroundCenter;
