import React from "react";
import { Box, Stack, Typography, Link } from "@mui/material";

const PartnerTile = ({ partnerName, paragraphText, image, website }) => {
  return (
    <Box my={3}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "flex-start" }}
      >
        <Link href={website} target="_blank" rel="noopener">
          <Box
            component="img"
            src={image}
            target="_blank"
            rel="noopener noreferrer"
            width={220}
            mr={{ xs: 0, md: 2 }}
            mb={{ xs: 2, md: 0 }}
          />
        </Link>
        <Box>
          <Typography variant="body">
            <Link
              href={website}
              sx={{
                color: "inherit",
                textDecoration: "none",
              }}
              target="_blank"
              rel="noopener"
            >
              <b>{partnerName}</b>
            </Link>{" "}
            {paragraphText}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default PartnerTile;
