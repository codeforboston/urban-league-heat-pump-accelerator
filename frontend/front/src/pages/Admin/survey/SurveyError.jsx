import React from "react";
import { Alert } from "@mui/material";

export const SurveyError = () => (
  <Alert severity="error">
    {"Error encountered while loading survey data."}
  </Alert>
);
