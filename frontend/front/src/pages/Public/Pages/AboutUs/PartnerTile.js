import React from "react";
import { Box, Stack, Typography, Link } from "@mui/material";

const PartnerTile = ({ partnerName, paragraphText, image, website }) => {
  return (
    <Box my={3}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "flex-start" }}
        // justifyContent="flex-end"
      >
        <Link
          component="img"
          src={image}
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          width={220}
          mr={{ xs: 0, md: 2 }}
          mb={{ xs: 2, md: 0 }}
        />

        <Box>
          <Typography variant="body">
            <b>{partnerName}</b> {paragraphText}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default PartnerTile;
