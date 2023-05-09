import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Link, Stack } from "@mui/material";
import ButtonWhite from "../../Components/Button/ButtonWhite";
import AnimatedBox from "../../Components/AnimatedBox";
import TitleHero from "../../Components/Typography/TitleHero";

const HeroWrapper = styled("div")(({ theme, image }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "300px",
  position: "relative",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  "& .text-wrapper": {
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  "& .text-overlay": {
    color: "var(--color-text-1)",
    margin: "0 auto",
    minWidth: "100vw",
    minHeight: "300px",
    top: "143px",
    left: 0,
    right: 0,
    bottom: 0,
    background: "var(--accent-1)",
    boxSizing: "border-box",
  },
}));

const HeroPage = ({
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
        <Box className="text-overlay">
          <AnimatedBox triggerOnce={false}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexGrow: 1,
                minHeight: "calc(100vh - 143px)",
              }}
            >
              <Box>
                <Stack>
                  <TitleHero text={title.toUpperCase()} />
                  <TitleHero
                    text={titleBold.toUpperCase()}
                    fontWeight="900"
                    color="var(--color-text-8)"
                  />
                </Stack>
                <Typography variant="bodyHero">
                  {text1}
                  {link !== "" && (
                    <Link
                      href={link}
                      target="_blank"
                      rel="noopener"
                      underline="always"
                      sx={{
                        color: "var(--color-text-1)",
                        fontWeight: "var(--font-weight-2)",
                        textDecoration: "solid underline 3px",
                        textUnderlinePosition: "under",
                        textDecorationColor: "var(--color-text-6)",
                      }}
                    >
                      {textBold}
                    </Link>
                  )}
                  {text2}
                </Typography>
              </Box>

              <ButtonWhite text="Take the survey" to="survey" />
            </Box>
          </AnimatedBox>
        </Box>
      </Box>
    </HeroWrapper>
  );
};

export default HeroPage;
