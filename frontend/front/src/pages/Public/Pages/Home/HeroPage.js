import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Link } from "@mui/material";
import ButtonCustom from "../../Components/ButtonCustom";
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
  "& .title-hero-underline": {
    fontFamily: "var(--font-family-1)",
    color: "var(--color-text-7)",
    fontSize: "3rem",
    // display: "block",
    fontWeight: "var(--font-weight-3)",
    textShadow: "1px 1px 1px var(--color-text-5)",
    lineHeight: "60px",
    letterSpacing: ".09rem",
    [theme.breakpoints.up("lg")]: {
      fontSize: "3.8rem",
      lineHeight: "80px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem !important",
      lineHeight: "50px",
      letterSpacing: "0rem",
      fontWeight: "var(--font-weight-1)",
    },
  },
  "& .text-wrapper": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
    paddingBottom: "143px",
  },
  "& .text-overlay": {
    color: "var(--color-text-1)",
    margin: "0 auto",
    maxWidth: "650px",
    background: "var(--accent-3)",
  },
  [theme.breakpoints.up("lg")]: {
    "& .text-overlay": {
      maxWidth: "1000px",
    },
  },
  [theme.breakpoints.up("xs")]: {
    "& .text-overlay": {
      borderRadius: "0",
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .text-overlay": {
      borderRadius: "5% 15% 5% 15%",
    },
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
        <AnimatedBox triggerOnce={true}>
          <Box
            className="text-overlay"
            pt={8}
            pb={9}
            sx={{
              px: { xs: 1, md: 4 },
              pt: { xs: 8 },
              marginTop: { xs: "143px" },
            }}
          >
            <Typography variant="titleHero">
              {title.toUpperCase()}
              <span className="title-hero-underline">
                {titleBold.toUpperCase()}
              </span>
            </Typography>

            <Typography variant="bodyHero" mt={3} mb={7}>
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
                    textDecorationColor: "var(--color-text-4)",
                  }}
                >
                  {textBold}
                </Link>
              )}
              {text2}
            </Typography>

            <ButtonCustom
              text="Take the survey"
              to="survey"
              variant="blackBtn"
              sx={{ width: "200px", height: "50px", textShadow: "none" }}
            />
          </Box>
        </AnimatedBox>
      </Box>
    </HeroWrapper>
  );
};

export default HeroPage;
