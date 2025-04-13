import React, { forwardRef, useEffect } from "react";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logSurveySubmission } from "../../../features/newrelic";

export const ThanksForSubmission = forwardRef((_, ref) => {
  useEffect(() => {
    logSurveySubmission();
  }, []);

  const navigate = useNavigate();
  return (
    <Alert
      ref={ref}
      severity="success"
      action={
        <Button
          color="inherit"
          size="small"
          onClick={() => {
            navigate("/public");
          }}
        >
          {"home"}
        </Button>
      }
    >
      {"Thank you for your submission!"}
    </Alert>
  );
});
