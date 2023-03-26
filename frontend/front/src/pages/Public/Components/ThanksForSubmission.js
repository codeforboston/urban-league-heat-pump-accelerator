import React from "react";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ThanksForSubmission = () => {
  const navigate = useNavigate();
  return (
    <Alert
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
};
