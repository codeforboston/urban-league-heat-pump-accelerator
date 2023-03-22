import React from 'react';
import { Box, Grid, Typography, Divider } from "@mui/material";

const PartnerTile = ({ partnerName, paragraphText, image, website }) => {

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      color="#000000"
      marginTop={3}
      marginBottom={3}
    >
      <Typography marginBottom={3} paragraph={true}>
        <b>{partnerName}</b> {paragraphText}
      </Typography>
      <a
        href={website}
        target='_blank'
      >
        <img
          style={{ height: 100, marginBottom: 12 }}
          alt={`logo of ${partnerName}`}
          src={image}
        />
      </a>
    </Grid>
  )
}

export default PartnerTile