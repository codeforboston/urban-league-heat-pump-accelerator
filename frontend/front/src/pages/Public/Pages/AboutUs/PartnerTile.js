import React from "react";
import { Box, Stack, Typography, Link } from "@mui/material";

const PartnerTile = ({ partnerName, paragraphText, image, website }) => {
  return (
    <Box mb={3} container>
      <Typography>
        <b>{partnerName}</b> {paragraphText}
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Link
          component="img"
          src={image}
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            width: "250px",
            display: "flex",
            justifyContent: "center",
            mt: 3,
            mb: 3,
          }}
        />
      </Stack>
    </Box>
  );
};

export default PartnerTile;
