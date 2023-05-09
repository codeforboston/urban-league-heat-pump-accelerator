import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Typography, Box } from "@mui/material";
import ButtonGetPump from "../../Components/ButtonGetPump";

// import { red, green, blue, yellow, orange } from "@mui/material/colors";
const Root = styled("div")(({ theme }) => ({
  // padding: theme.spacing(1),
  // [theme.breakpoints.up("xs")]: {
  //   backgroundColor: yellow[500],
  // },
  // [theme.breakpoints.up("sm")]: {
  //   backgroundColor: red[500],
  // },
  // [theme.breakpoints.up("md")]: {
  //   backgroundColor: blue[500],
  // },
  // [theme.breakpoints.up("lg")]: {
  //   backgroundColor: green[500],
  // },
  // [theme.breakpoints.up("xl")]: {
  //   backgroundColor: orange[500],
  // },
}));

const HeroWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  height: "calc(100vh - 115px)",
  position: "relative",
  "& .home-hero-container": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-end",
  },
  "& .home-hero-info": {
    color: "var(--color-text-1)",
    position: "absolute",
    justifyContent: "center",
  },
  "& .image-wrapper": {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    "& .home-hero-image": {
      objectFit: "cover",
      paddingTop: "150px",
      objectPosition: "top",
    },
  },
  [theme.breakpoints.up("xs")]: {
    "& .home-hero-image": {
      height: "80%",
    },
    "& .image-wrapper": {
      justifyContent: "flex-end",
    },
    "& .info-container": {
      background: "var(--accent-3)",
      padding: "16px",
      margin: "0 16px",
    },
  },
  [theme.breakpoints.up("sm")]: {
    "& .home-hero-image": {
      height: "100%",
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .home-hero-info": {
      justifyContent: "flex-start",
      marginLeft: "10%",
    },
    "& .info-container": {
      background: "none",
      padding: "none",
    },
  },
  [theme.breakpoints.up("lg")]: {
    "& .home-hero-container": {
      margin: "96px 0",
    },

    "& .image-wrapper": {
      justifyContent: "flex-start",
      "& .home-hero-image": {
        borderRadius: "0 0 20% 0",
      },
    },
  },
  [theme.breakpoints.up("xl")]: {
    "& .home-hero-info": {
      justifyContent: "flex-end",
      marginLeft: "0",
    },
  },
}));

const InfoWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  maxWidth: "500px",
  minWidth: "310px",
  textAlign: "left",
  [theme.breakpoints.up("xs")]: {
    textAlign: "center",
    padding: "16px",
  },
}));

const HeroPage = ({ title, titleBold, text, image, backColor }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 500);
    return () => setIsMounted(false);
  }, []);

  console.log(isMounted);
  return (
    <Root>
      <HeroWrapper sx={{ background: backColor }}>
        <Grid container className="home-hero-container">
          <Grid
            item
            xs={12}
            lg={6}
            container
            className="home-hero-info"
            sx={{ zIndex: 3 }}
          >
            <InfoWrapper className="info-container">
              <Box className="info-wrapper">
                <Box sx={{ textShadow: "1px 1px 2px #000" }}>
                  <Typography variant="titleHero">
                    {title.toUpperCase()}
                    <span className="hero-title-bold">
                      {titleBold.toUpperCase()}
                    </span>
                  </Typography>

                  <Typography variant="bodyHero" mb={8} mt={2}>
                    {text}
                  </Typography>
                </Box>

                <ButtonGetPump variant="getpump" />
              </Box>
            </InfoWrapper>
          </Grid>

          <Grid item xs={6} lg={6} className="image-wrapper">
            <Box
              component="img"
              src={image}
              alt={title}
              className="home-hero-image"
            ></Box>
          </Grid>
        </Grid>
      </HeroWrapper>
    </Root>
  );
};

export default HeroPage;
