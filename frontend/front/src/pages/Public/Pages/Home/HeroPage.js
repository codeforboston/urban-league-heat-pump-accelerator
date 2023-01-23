import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Typography, Box } from "@mui/material";
import ButtonGetPump from "../../Components/ButtonGetPump";
import graphicHeroUnderline from "../../../../assets/images/graphic-hero-underline.svg";

import { red, green, blue, yellow, orange } from "@mui/material/colors";
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
  // background: "#98C7D6",
  background:
    "linear-gradient(90deg, rgba(152,199,214,1) 50%, rgba(114,190,222,1) 100%)",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  height: "calc(100vh - 115px)",
  maxHeight: "850px",
  position: "relative",

  "& .home-hero-container": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-end",
  },
  "& .home-hero-info": {
    color: "#fff",
    "& .info-wrapper": {
      "& h1": {
        fontSize: "2rem",
        fontWeight: "bold",
        lineHeight: "1.5",
      },
    },
  },
  "& .image-wrapper": {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    "& .home-hero-image": {
      objectFit: "cover",
    },
  },
  [theme.breakpoints.up("xs")]: {
    "& .home-hero-info": {
      position: "absolute",
      justifyContent: "center",
    },

    "& .home-hero-image": {
      height: "90%",
    },
    "& .image-wrapper": {
      justifyContent: "flex-end",
    },
    "& .image-overlay": {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      height: "100%",
      width: "100%",
      overflow: "hidden",
    },
  },
  [theme.breakpoints.up("sm")]: {
    "& .home-hero-image": {
      height: "90%",
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .home-hero-image": {
      paddingTop: "30px",
      height: "90%",
    },
    "& .home-hero-info": {
      justifyContent: "flex-start",
      marginLeft: "10%",
    },
  },
  [theme.breakpoints.up("lg")]: {
    "& .home-hero-container": {
      margin: "96px 0",
    },

    "& .image-wrapper": {
      justifyContent: "flex-start",
      "& .home-hero-image": {
        paddingTop: "50px",
        height: "90%",
        borderRadius: "0 0 10% 0",
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

  [theme.breakpoints.up("md")]: {
    textAlign: "left",
  },
}));

const ImageOverlay = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const HeroPage = ({ title, text, image }) => {
  return (
    <Root>
      <HeroWrapper>
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
                <Box>
                  <Typography variant="h1">{title}</Typography>
                  <Box
                    component="img"
                    src={graphicHeroUnderline}
                    mb={3}
                    sx={{ width: "80%" }}
                  />
                </Box>
                <Typography variant="body1" mb={7}>
                  {text}
                </Typography>
                <ButtonGetPump />
              </Box>
            </InfoWrapper>
          </Grid>

          <Grid item xs={6} lg={6} className="image-wrapper">
            <ImageOverlay className="image-overlay" />
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
