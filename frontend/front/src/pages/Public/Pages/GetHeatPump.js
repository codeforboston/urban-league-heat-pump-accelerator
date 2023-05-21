import React from "react";
import { Box, Typography, Divider, Stack, Container } from "@mui/material";
import Heading1BlueBgGround from "../Components/Typography/Heading1BlueBgGround";

const GetHeatPump = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 560px)",
      }}
    >
      <Heading1BlueBgGround text="How to Get a Heat Pump?" />
      <Container sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Stack direction="column">
          <Box textAlign="center" mt={6}>
            text
          </Box>
          <Box mt={6}>
            <Divider sx={{ width: "100%" }} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default GetHeatPump;
