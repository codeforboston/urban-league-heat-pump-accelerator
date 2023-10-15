import React from "react";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Typography, Box, Button } from "@mui/material";
import AnimatedBox from "../../Components/AnimatedBox";
import TitleHero from "../../Components/Typography/TitleHero";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
    minWidth: "100vw",
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
                minHeight: "calc(100vh - 122px)",
                "@media (max-width: 385px)": {
                  minHeight: "calc(100vh - 90px)",
                },
              }}
            >
              <Box>
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

              <Button
                component={RouterLink}
                to="/public/benefits-heat-pump"
                onClick={() => window.scrollTo(0, 0)}
                sx={{
                  width: "100%",
                  minWidth: 200,
                  maxWidth: 350,
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
            </Box>
          </AnimatedBox>
        </Box>
      </Box>
    </HeroWrapper>
  );
};

export default HeroPage;
