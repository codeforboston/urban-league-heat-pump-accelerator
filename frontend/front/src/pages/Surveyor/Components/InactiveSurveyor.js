import { Container, Typography } from "@mui/material";
import React from "react";

const InactiveSurveyor = () => {
  return (
    <Container>
      <Typography variant="h4" mt={5} align="center">
        Account is inactive, please contact admin to activate account.
      </Typography>
    </Container>
  );
};

export default InactiveSurveyor;
