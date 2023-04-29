import React from "react";
import { Box, Stack, Typography, Link } from "@mui/material";

const PartnerTile = ({ partnerName, paragraphText, image, website }) => {
  return (
    <Box my={3}>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Link
          component="img"
          src={image}
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          width={220}
          m={2}
        />

        <Box>
          <Typography color="#0a0b0b">
            <b>{partnerName}</b> {paragraphText}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default PartnerTile;
