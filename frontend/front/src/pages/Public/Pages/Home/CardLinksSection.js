import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Grid, Card } from "@mui/material";
import ButtonCustom from "../../Components/ButtonCustom";

const CardLinks = styled("div")(({ theme }) => ({
  minWidth: "350px",
  maxWidth: "480px",
  borderRadius: "2%",
  padding: "1px 0",
  backgroundColor: "var(--bgColor-11)",
  border: "var(--border-card-2)",
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
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const CardLinksSection = () => {
  const linkCards = [
    {
      id: 1,
      title: "Take ",
      titleSticky: "the Survey",
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
      title: "Learn more ",
      titleSticky: "About us",
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
          <CardLinks>
            <Box id="survey-link-section" m={4}>
              <Typography textAlign="center" variant="title2">
                {detail.title}
                <span className="exp-title1-span">{detail.titleSticky}</span>
              </Typography>
              <Box
                sx={{
                  height: "140px",
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "var(--color-text-3)",
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
                  variant={detail.button.variant}
                />
              </Box>
            </Box>
          </CardLinks>
        </Grid>
      ))}
    </GridLinkWrapper>
  );
};

export default CardLinksSection;
