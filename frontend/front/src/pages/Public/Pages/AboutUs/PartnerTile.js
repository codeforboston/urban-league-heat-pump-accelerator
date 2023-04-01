import React from 'react';
import { Box, Grid, Typography } from "@mui/material";

const PartnerTile = ({ partnerName, paragraphText, image, website }) => {

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      marginTop={3}
      marginBottom={3}
    >
      <Typography marginBottom={3}>
        <b>{partnerName}</b> {paragraphText}
      </Typography>
      <a
        href={website}
        target='_blank'
        rel="noopener noreferrer"
      >
        <Box
          component="img"
          src={ulem}
          sx={{
            height: 100,
            "max-width": "90%",
            mt: 3,
            mb: 3,
          }}
        />
      </a>
    </Grid>
  )
}

export default PartnerTile