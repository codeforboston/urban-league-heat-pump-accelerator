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
  height: "calc(100vh - 124px)",
  position: "absolute",
  bottom: 0,
  paddingBottom: "5rem",
  width: "100%",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  "& .text-overlay": {
    width: "100%",
    position: "absolute",
    paddingBottom: "3rem",
    paddingTop: "2rem",
    height: "calc(100vh - 124px)",
    background: "var(--accent-1)",
  },
}));

const ArrowDown = () => {
  const scrollToSection = () => {
    const section = document.getElementById("target-section");
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <IconButton
      onClick={scrollToSection}
      sx={{
        color: "var(--color-text-5)",
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
  );
};

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

  return (
    <HeroWrapper image={image}>
      <Box className="text-overlay">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              mt: { xs: 2, sm: 10 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnimatedBox triggerOnce={false}>
              <TitleHero
                text={title.toUpperCase()}
                titleBold={titleBold.toUpperCase()}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "var(--color-text-9)",
                  px: { xs: 1, md: 20 },
                  textAlign: "center",
                }}
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  mt: 6,
                }}
              >
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
                    "&:hover": {
                      backgroundColor: "var(--bgColor-3)",
                    },
                  }}
                >
                  {t("public.home.hero.button")}
                </Button>
                <Box sx={{ pt: 6, display: { xs: "block", sm: "none" } }}>
                  <ArrowDown />
                </Box>
              </Box>
            </AnimatedBox>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              pb: 5,
              pt: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
            <ArrowDown />
          </Box>
        </Box>
      </Box>
    </HeroWrapper>
  );
};

export default HeroPage;
