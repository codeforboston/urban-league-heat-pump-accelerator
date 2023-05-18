import React from "react";
import { Box, Typography, Divider, Stack, Container } from "@mui/material";
import Heading1BlueBgGround from "../Components/Typography/Heading1BlueBgGround";

const GetInvolved = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 560px)",
      }}
    >
      <Heading1BlueBgGround text="Get Involved" />
      <Container sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Stack direction="column">
          <Box textAlign="center" mt={6}>
            <Typography>BHPA CORE PARTNERS</Typography>
          </Box>
          <Box mt={6}>
            <Divider sx={{ width: "100%" }} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default GetInvolved;
