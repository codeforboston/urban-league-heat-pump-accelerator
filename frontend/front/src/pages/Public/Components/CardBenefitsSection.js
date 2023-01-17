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

const StyledGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
}));

const CardBenefitsSection = ({ cards }) => {
  return (
    <>
      <Typography gutterBottom variant="h4" mb={6} align="center" gutterBottom>
        Benefits of Heat Pumps
      </Typography>
      {cards.map((card) => (
        <Grid container spacing={4} mb={15} key={card.id}>
          {!card.imageRight ? (
            <>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  sx={{ width: "100%", height: "auto", borderRadius: "1%" }}
                  src={card.image}
                  alt={card.title}
                />
              </Grid>
              <StyledGrid item xs={12} md={6}>
                <Typography variant="h6" textAlign="center">
                  {card.title}
                </Typography>
                <CardContent>
                  {card.paragraphs.map((paragraph) => (
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      {paragraph}
                    </Typography>
                  ))}
                  {card.buttonLink !== "" && (
                    <CardActions
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button component={Link} to={card.buttonLink}>
                        {card.buttonText}
                      </Button>
                    </CardActions>
                  )}
                </CardContent>
              </StyledGrid>
            </>
          ) : (
            <>
              <StyledGrid item xs={12} md={6}>
                <Typography variant="h6" textAlign="center">
                  {card.title}
                </Typography>
                <CardContent>
                  {card.paragraphs.map((paragraph) => (
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      {paragraph}
                    </Typography>
                  ))}
                  {card.buttonLink !== "" && (
                    <CardActions
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button component={Link} to={card.buttonLink}>
                        {card.buttonText}
                      </Button>
                    </CardActions>
                  )}
                </CardContent>
              </StyledGrid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  sx={{ width: "100%", height: "auto", borderRadius: "1%" }}
                  src={card.image}
                  alt={card.title}
                />
              </Grid>
            </>
          )}
        </Grid>
      ))}
    </>
  );
};

export default CardBenefitsSection;
