import React from "react";
import { Typography, Box, Grid, CardContent, CardActions } from "@mui/material";
import ButtonGetPumnp from "./ButtonGetPump";

const CardHero = ({ title, paragraphs, image }) => {
  return (
    <Grid
      container
      spacing={4}
      mb={15}
      mt={6}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="end"
        align="center"
      >
        <Typography width="350px" variant="h4" color="initial">
          Boston Residents Can Benefit From Heat Pumps
        </Typography>
        <CardContent>
          <Typography width="350px" color="initial" variant="subtitle1">
            Heat pumps are effective, continuous, nearly silent and extremely
            energy efficient.
          </Typography>
          {paragraphs.map((paragraph) => (
            <Typography variant="subtitle1" color="textSecondary">
              {paragraph}
            </Typography>
          ))}
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <ButtonGetPumnp />
          </CardActions>
        </CardContent>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{ borderRadius: "15%", width: "auto" }}
        />
      </Grid>
    </Grid>
  );
};

export default CardHero;
