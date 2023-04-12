import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Grid } from "@mui/material";
import ButtonCustom from "../../Components/ButtonCustom";

import AnimatedBox from "../../Components/AnimatedBox";

const CardLinks = styled("div")(({ theme }) => ({
  minWidth: "270px",
  maxWidth: "480px",
  borderRadius: "2%",
  padding: "1px 0",
  backgroundColor: "var(--bgColor-11)",
  border: "var(--box-shadow-2)",
  "& .links-wrapper": {
    "& h2": {
      fontSize: "1.5rem",
      fontWeight: "bold",
      lineHeight: "1.5",
    },
  },
}));

const GridLinkWrapper = styled("Grid")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "nowrap",
  gap: "2rem",
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
  },
}));

const CardLinksSection = () => {
  const linkCards = [
    {
      id: 1,
      title: "Add Your Voice",
      paragraph:
        "Tell us your thoughts and questions about heat pumps to a collection of homeowner's questions and thoughts about heat pumps.",
      button: {
        text: "Take the survey",
        to: "survey",
        variant: "customBtn",
      },
      idCSS: "survey-link-section",
      animationCSS: "animate__heartBeat",
    },
    {
      id: 2,
      title: "About Us",
      paragraph: "Empowering Boston residents to save, stay, and sustain.",
      button: {
        text: "Learn more",
        to: "learn-more",
        variant: "customBtn",
      },
      idCSS: "learnmore-link-section",
      animationCSS: "animate__heartBeat",
    },
  ];

  return (
    <GridLinkWrapper container>
      {linkCards.map((detail) => (
        <AnimatedBox triggerOnce={false}>
          <Grid
            item
            id={detail.idCSS}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardLinks>
              <Box id="survey-link-section" m={4}>
                <Typography textAlign="center" variant="title2">
                  {detail.title}
                </Typography>

                <Box
                  sx={{
                    height: "140px",
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "var(--color-text-6)",
                  }}
                >
                  <Typography variant="body1">{detail.paragraph}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ButtonCustom
                    text={detail.button.text}
                    to={detail.button.to}
                    variant="customBtn"
                  />
                </Box>
              </Box>
            </CardLinks>
          </Grid>
        </AnimatedBox>
      ))}
    </GridLinkWrapper>
  );
};

export default CardLinksSection;
