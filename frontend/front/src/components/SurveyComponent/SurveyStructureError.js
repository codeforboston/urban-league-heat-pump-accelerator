import React from "react";
import { Alert } from "@mui/material";

export const SurveyError = () => (
  <Alert severity="error">
    {"Encountered an error while loading the survey."}
  </Alert>
);
