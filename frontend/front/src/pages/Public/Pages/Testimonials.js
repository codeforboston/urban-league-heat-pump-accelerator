import { Box, Container } from "@mui/material";
import React from "react";
import Heading1BlueBgGround from "../Components/Typography/Heading1BlueBgGround";
import Testimonial from "./Home/Testimonial";

function Testimonials() {
  return (
    <Box
      mb={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 520px)",
      }}
    >
      <Heading1BlueBgGround text="Testimonials" />
      <Container>
        <Box mb={{ xs: 1, sm: 6 }} mt={{ xs: 1, sm: 2 }}>
          <Testimonial />
        </Box>
      </Container>
    </Box>
  );
}

export default Testimonials;
