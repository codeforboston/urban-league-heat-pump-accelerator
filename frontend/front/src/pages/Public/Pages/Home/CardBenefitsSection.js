import React from "react";
import {
  Typography,
  Box,
  Grid,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AnimatedBox from "../../Components/AnimatedBox";

const StyledGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
}));

const CardBenefitsSection = ({ cards }) => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography px={2} variant="title1">
          Benefits of Heat Pumps
        </Typography>
      </Box>
      {cards.map((card, index) => (
        <Grid
          container
          key={card.id}
          sx={{
            flexDirection: {
              md: `${index % 2 === 0 ? "row" : "row-reverse"}`,
              xs: "row",
            },
          }}
        >
          <Grid item xs={12} sm={6}>
            <Box
              component="img"
              sx={{
                backgroundSize: "fit",
                width: "100%",
                height: "100%",
              }}
              src={card.image}
              alt={card.title}
            />
          </Grid>
          <StyledGrid
            item
            sx={{ background: "var(--bgColor-10)", pt: { xs: 2, md: 0 } }}
            xs={12}
            sm={6}
          >
            <AnimatedBox>
              <Box>
                <Typography variant="h6">
                  <span>{card.title}</span>
                </Typography>
                <CardContent>
                  {card.paragraphs.map((paragraph) => (
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      color="var(--color-text-3)"
                    >
                      {paragraph}
                    </Typography>
                  ))}
                  {card.buttonLink !== "" && (
                    <CardActions
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        component={Link}
                        to={card.buttonLink}
                        sx={{ color: "var(--color-text-4)" }}
                      >
                        {card.buttonText}
                      </Button>
                    </CardActions>
                  )}
                </CardContent>
              </Box>
            </AnimatedBox>
          </StyledGrid>
        </Grid>
      ))}
    </>
  );
};

export default CardBenefitsSection;
