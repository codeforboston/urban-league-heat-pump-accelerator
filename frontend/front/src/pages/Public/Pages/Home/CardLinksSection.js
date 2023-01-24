import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Grid } from "@mui/material";
import ButtonCustom from "../../Components/ButtonCustom";
import AnimatedBoxScroll from "../../Components/AnimatedBoxScroll";

const CardLinks = styled("div")(({ theme }) => ({
  minWidth: "350px",
  maxWidth: "480px",
  // width: "480px",
  borderRadius: "25% 10%",
  backgroundColor: "var(--bgColor-8)",
}));

const CardLinksSection = () => {
  return (
    <Grid container spacing={12} justifyContent="center">
      <Grid
        item
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
          <AnimatedBoxScroll
            animation="animate__heartBeat"
            id="survey-link-section"
          >
            <Box m={4}>
              <Typography textAlign="center" variant="h4" margimGutter>
                Take The Survey
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
                <Typography variant="subtitle1">
                  Tell us your thoughts and questions about heat pumps.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ButtonCustom
                  text="Take the survey"
                  to="survey"
                  variant="customBtn"
                />
              </Box>
            </Box>
          </AnimatedBoxScroll>
        </CardLinks>
      </Grid>
      <Grid
        item
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
          <AnimatedBoxScroll
            animation="animate__heartBeat"
            id="learnmore-link-section"
          >
            <Box m={4}>
              <Typography textAlign="center" variant="h4" margimGutter>
                Learn More About Us
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
                <Typography variant="subtitle1">
                  It’s our mission to bring heat pumps to Boston homes.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ButtonCustom
                  text="Learn more"
                  to="about"
                  variant="customBtn"
                />
              </Box>
            </Box>
          </AnimatedBoxScroll>
        </CardLinks>
      </Grid>
    </Grid>
  );
};

export default CardLinksSection;
