import React from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import imageVoice from "../../../../assets/images/copywritingImages/add-your-voice.png";
import imageAbout from "../../../../assets/images/copywritingImages/about-us.png";
import ButtonDarkBklue from "../../Components/Button/ButtonDarkBlue";
import Heading2 from "../../Components/Typography/Heading2";

import AnimatedBox from "../../Components/AnimatedBox";

const CardLinks = styled("div")(({ theme }) => ({
  "& .links-wrapper": {
    "& h2": {
      fontSize: "1.5rem",
      fontWeight: "bold",
      lineHeight: "1.5",
    },
  },
}));

const GridLinkWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "nowrap",
  gap: "2rem",
  [theme.breakpoints.down("lg")]: {
    flexWrap: "wrap",
  },
}));

const CardLinksSection = () => {
  const linkCards = [
    {
      id: 1,
      title: "What is a heat pump?",
      paragraph:
        "A heat pump is an energy-efficient system that heats your home in the winter, and cools your home in the summer.",
      button: {
        text: "Take the survey",
        to: "survey",
      },
      idCSS: "survey-link-section",
      image: imageAbout,
    },
    {
      id: 2,
      title: "About Us",
      paragraph:
        "The Boston Heat Pump Accelerator is an initiative of the Urban League of Eastern Massachusetts, in partnership with local and national organizations.",
      button: {
        text: "Learn more",
        to: "about-us",
      },
      idCSS: "learnmore-link-section",
      image: imageVoice,
    },
  ];

  return (
    <GridLinkWrapper>
      {linkCards.map((detail, index) => (
        <CardLinks>
          <Card
            key={index}
            sx={{
              background: "var(--bgColor-3)",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
              minWidth: { xs: "260px", lg: "634px" },
              maxWidth: { xs: "468px", sm: "680px" },
              borderRadius: "2%",
            }}
            id={detail.idCSS}
          >
            <CardMedia
              component="img"
              sx={{
                width: { xs: "100%", sm: "300px" },
                minWidth: "260px",
                maxWidth: { xs: "468px", sm: "680px" },
                backgroundSize: "cover",
                height: "auto",
              }}
              image={detail.image}
              alt={detail.title}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <AnimatedBox triggerOnce={false}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Box
                    id="survey-link-section"
                    sx={{
                      maxHeight: { xs: "auto", sm: "300px" },
                      minHeight: { xs: "auto", sm: "270px" },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Heading2 text={detail.title} />

                    <Box
                      sx={{
                        height: { xs: "auto", sm: "140px" },
                        my: { xs: 2, sm: 0 },
                        color: "var(--color-text-3)",
                      }}
                    >
                      <Typography variant="body1">
                        {detail.paragraph}
                      </Typography>
                    </Box>
                    <Box
                      mt={2}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <ButtonDarkBklue
                        text={detail.button.text}
                        to={detail.button.to}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </AnimatedBox>
            </Box>
          </Card>
        </CardLinks>
      ))}
    </GridLinkWrapper>
  );
};

export default CardLinksSection;
