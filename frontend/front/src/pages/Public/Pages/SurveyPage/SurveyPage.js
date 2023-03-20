import React from "react";
import { Container, Stack } from "@mui/material";
import { PublicSurvey } from "../../../../components/SurveyComponent/SurveyComponent";

export const SurveyPage = () => (
  <Container>
    <Stack direction="column" alignItems="center" justifyContent="center">
      <h1>TAKE THE SURVEY</h1>
      <p>
        Fill out this form to record your interest in installing a heat pump for
        your home.
      </p>
      <p>
        An ULHPA representative will contact you with more information about the
        installation process.
      </p>
    </Stack>
    <PublicSurvey />
  </Container>
);
