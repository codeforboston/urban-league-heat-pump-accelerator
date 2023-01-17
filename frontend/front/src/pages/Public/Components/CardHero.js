import React from "react";
import { Typography, Box, Grid, CardContent, CardActions } from "@mui/material";
import ButtonGetPumnp from "./ButtonGetPump";

const CardHero = ({ title, paragraphs, image }) => {
  return (
    <Grid
      container
      spacing={4}
      mb={15}
      pt={15}
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
        <Typography width="400px" variant="h4" color="initial">
          {title}
        </Typography>
        <CardContent>
          {paragraphs.map((paragraph) => (
            <Typography
              gutterBottom
              width="400px"
              color="initial"
              variant="subtitle1"
            >
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
