import React from "react";
import { Grid, Typography, Box } from "@mui/material";

const Partners = ({ title, partners, width }) => {
  return (
    <Box my={15}>
      <Typography variant="h4" mb={6} align="center" gutterBottom>
        {title}
      </Typography>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        {partners.map((partner) => (
          <Grid item key={partner.id}>
            <a href={partner.link} target="_blank" rel="noopener noreferrer">
              <Box
                component="img"
                sx={{ width: width, height: "auto" }}
                src={partner.logo}
                alt={partner.name}
              />
            </a>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Partners;
