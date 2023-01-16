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

const CardBenefitsReusable = ({
  title,
  paragraphs,
  image,
  buttonText,
  buttonLink,
  imageRight,
}) => {
  return (
    <Grid container spacing={4} my={15}>
      {!imageRight ? (
        <>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{ width: "100%", height: "auto" }}
              src={image}
              alt={title}
            />
          </Grid>
          <StyledGrid item xs={12} md={6}>
            <Typography variant="h5" textAlign="center">
              {title}
            </Typography>
            <CardContent>
              {paragraphs.map((paragraph) => (
                <Typography variant="subtitle1" color="textSecondary">
                  {paragraph}
                </Typography>
              ))}
              {buttonLink !== "" && (
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                  <Button component={Link} to={buttonLink}>
                    {buttonText}
                  </Button>
                </CardActions>
              )}
            </CardContent>
          </StyledGrid>
        </>
      ) : (
        <>
          <StyledGrid item xs={12} md={6}>
            <Typography variant="h5" textAlign="center">
              {title}
            </Typography>
            <CardContent>
              {paragraphs.map((paragraph) => (
                <Typography variant="subtitle1" color="textSecondary">
                  {paragraph}
                </Typography>
              ))}
              {buttonLink !== "" && (
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                  <Button component={Link} to={buttonLink}>
                    {buttonText}
                  </Button>
                </CardActions>
              )}
            </CardContent>
          </StyledGrid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{ width: "100%", height: "auto" }}
              src={image}
              alt={title}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CardBenefitsReusable;
