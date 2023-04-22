import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Card, CardContent, CardMedia } from "@mui/material";
import imageVoice from "../../../../assets/images/surveyor.jpg";
import imageAbout from "../../../../assets/images/heat-pump-outside-home.jpg";

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
      image: imageVoice,
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
      image: imageAbout,
    },
  ];

  return (
    <GridLinkWrapper container>
      {linkCards.map((detail) => (
        <AnimatedBox triggerOnce={false}>
          <CardLinks>
            <Card sx={{ display: "flex" }} id={detail.idCSS}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={detail.image}
                alt={detail.title}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Box id="survey-link-section" m={4}>
                    <Typography variant="title2">{detail.title}</Typography>

                    <Box
                      sx={{
                        height: "140px",
                        color: "var(--color-text-6)",
                      }}
                    >
                      <Typography variant="body1">
                        {detail.paragraph}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <ButtonCustom
                        text={detail.button.text}
                        to={detail.button.to}
                        variant="customBtn"
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </CardLinks>
        </AnimatedBox>
      ))}
    </GridLinkWrapper>
  );
};

export default CardLinksSection;
