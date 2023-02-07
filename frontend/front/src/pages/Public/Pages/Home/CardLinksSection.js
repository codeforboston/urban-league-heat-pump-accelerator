import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Grid } from "@mui/material";
import ButtonCustom from "../../Components/ButtonCustom";
import AnimatedBoxScroll from "../../Components/AnimatedBoxScroll";

const CardLinks = styled("div")(({ theme }) => ({
  minWidth: "350px",
  maxWidth: "480px",
  borderRadius: "25% 10%",
  backgroundColor: "var(--bgColor-8)",
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
  gap: "48px",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    gap: "30px",
  },
}));

const CardLinksSection = () => {
  const linkCards = [
    {
      id: 1,
      title: "Take The Survey",
      paragraph: "Tell us your thoughts and questions about heat pumps.",
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
      title: "Learn More About Us",
      paragraph: "It’s our mission to bring heat pumps to Boston homes.",
      button: {
        text: "Learn more",
        to: "about",
        variant: "customBtn",
      },
      idCSS: "learnmore-link-section",
      animationCSS: "animate__heartBeat",
    },
  ];

  return (
    <GridLinkWrapper container>
      {linkCards.map((detail) => (
        <Grid
          item
          id={detail.idCSS}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardLinks
            sx={{
              borderRadius: "25% 10%",
              backgroundColor: "var(--bgColor-8)",
            }}
          >
            {/* <AnimatedBoxScroll
              animation={detail.animationCSS}
              id={detail.idCSS}
            > */}
            <Box id="survey-link-section" m={4}>
              <Typography textAlign="center" variant="h5" margimGutter>
                {detail.title}
              </Typography>
              <Box
                sx={{
                  height: "140px",
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">{detail.paragraph}</Typography>
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
                  variant={detail.button.variant}
                />
              </Box>
            </Box>
            {/* </AnimatedBoxScroll> */}
          </CardLinks>
        </Grid>
      ))}
    </GridLinkWrapper>
  );
};

export default CardLinksSection;
