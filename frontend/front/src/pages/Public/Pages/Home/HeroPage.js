import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { Typography, Box, Button, IconButton } from "@mui/material";
import AnimatedBox from "../../Components/AnimatedBox";
import TitleHero from "../../Components/Typography/TitleHero";
import { Link as MuiLink } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/KeyboardArrowDown";

const HeroWrapper = styled("div")(({ theme, image }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "350px",
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
    margin: "0 auto",
    width: "100%",
    minHeight: "350px",
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
  const { t } = useTranslation();

  const scrollToSection = () => {
    const section = document.getElementById("target-section");
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <HeroWrapper image={image}>
      <Box className="text-wrapper">
        <Box className="text-overlay">
          <AnimatedBox triggerOnce={false}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                minHeight: "calc(100vh - 232px)",
                "@media (max-width: 385px)": {
                  minHeight: "calc(100vh - 90px)",
                },
              }}
            >
              <Box px={0.5} mt={2}>
                <TitleHero
                  text={title.toUpperCase()}
                  titleBold={titleBold.toUpperCase()}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "var(--color-text-9)", px: { xs: 1, md: 20 } }}
                >
                  {text1}
                  {link !== "" && (
                    <MuiLink
                      href={link}
                      target="_blank"
                      rel="noopener"
                      underline="always"
                      sx={{
                        color: "var(--color-text-9)",
                        fontWeight: 800,
                        textDecoration: "solid underline 3px",
                        textUnderlinePosition: "under",
                        textDecorationColor: "var(--color-text-6)",
                      }}
                    >
                      {textBold}
                    </MuiLink>
                  )}
                  {text2}
                </Typography>
              </Box>
              <Box>
                <Button
                  component={RouterLink}
                  to="/public/benefits-heat-pump"
                  onClick={() => window.scrollTo(0, 0)}
                  sx={{
                    width: "auto",
                    height: "50px",
                    color: "var(--color-text-2)",
                    background: "var(--bgColor-3)",
                    borderRadius: "50px",
                    px: 3,
                    mt: 3,
                    "&:hover": {
                      backgroundColor: "var(--bgColor-3)",
                    },
                  }}
                >
                  {t("public.home.hero.button")}
                </Button>
              </Box>
            </Box>
            <IconButton
              onClick={scrollToSection}
              sx={{
                borderRadius: "50%",
                color: "var(--color-text-5)",
                mt: 4,
                mb: 4,
                animation: "moveUpDown 2s infinite",
                "@keyframes moveUpDown": {
                  "0%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" },
                  "100%": { transform: "translateY(0)" },
                },
              }}
            >
              <ArrowDownwardIcon fontSize="large" />
            </IconButton>
          </AnimatedBox>
        </Box>
      </Box>
    </HeroWrapper>
  );
};

export default HeroPage;
