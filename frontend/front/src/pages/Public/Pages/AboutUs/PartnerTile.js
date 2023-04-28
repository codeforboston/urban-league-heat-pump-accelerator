import React from "react";
import { Box, Stack, Typography, Link } from "@mui/material";

const PartnerTile = ({ partnerName, paragraphText, image, website }) => {

  return (
    <Box margin={3} container>
      <Stack
        direction="row"
        alignItems={'center'}
        justifyContent={'center'}
        spacing={1}
        flexWrap={window.innerWidth < 600 ? 'wrap' : 'nowrap'}
      >
        <Box>
          <Link
            component="img"
            src={image}
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            width={220}
            margin={2}
          />
        </Box>
        <Box>
          <Typography color='#0a0b0b'>
            <b>{partnerName}</b> {paragraphText}
          </Typography>
        </Box>
      </Stack >
    </Box >
  );
};

export default PartnerTile;
