import React from "react";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SubmissionSuccess = ({ submissionId, surveyId }) => {
  const navigate = useNavigate();
  return (
    <Alert
      sx={{ margin: "1em" }}
      severity="success"
      action={
        <Button
          color="inherit"
          size="small"
          onClick={() => {
            navigate("/surveyor/dashboard");
          }}
        >
          {"dashboard"}
        </Button>
      }
    >
      {`Successfully submitted submission '${submissionId}' for survey '${surveyId}'`}
    </Alert>
  );
};
