import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Grid, CardMedia, CardActions } from "@mui/material";

import ButtonCustom from "./ButtonCustom";
import imageLearnMore from "../../../assets/images/image-learn-more.jpeg";

const CardLinks = styled("div")(({ theme }) => ({
  borderRadius: "25% 10%",
}));

const CardImagemOverlay = () => {
  return (
    <Grid container spacing={4} justifyContent="center">
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardLinks
          sx={{
            maxWidth: 500,
            width: "480px",
            borderRadius: "25% 10%",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="250"
              image={imageLearnMore}
              sx={{
                borderRadius: "25% 10%",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                bgcolor: "var(--accent-1)",
                color: "white",
                height: "100%",
                borderRadius: "25% 10%",
              }}
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
                    Tell us your thoughts and questions about heat pumps
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    // backgroundColor: "var(--bgColor-8)",
                    // borderRadius: "100%",
                  }}
                >
                  <ButtonCustom
                    text="Take the survey"
                    to="survey"
                    variant="customBtn"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardLinks>
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardLinks sx={{ maxWidth: 500, width: "480px" }}>
          <Box sx={{ position: "relative" }}>
            <CardMedia component="img" height="250" image={imageLearnMore} />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                bgcolor: "var(--accent-1)",
                color: "white",
                height: "100%",
              }}
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
              </Box>
            </Box>
          </Box>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "var(--bgColor-8)",
            }}
          >
            <ButtonCustom
              text="Learn More"
              to="learn-more"
              variant="customBtn"
            />
          </CardActions>
        </CardLinks>
      </Grid>
    </Grid>
  );
};

export default CardImagemOverlay;
