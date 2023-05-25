import React from "react";
import { Box, Button } from "@mui/material";

import QuestionUnit from "./question/QRadio";

const AssessmentPanel = () => {
  return (
    <>
      <Box>
        <QuestionUnit
          question="Visited?"
          choice1="Yes"
          choice2="No"
          choice3="NA"
        />
        <QuestionUnit
          question="Talked with Owner?"
          choice1="Yes"
          choice2="No"
          choice3="NA"
        />
        <QuestionUnit
          question="Was Home?"
          choice1="Yes"
          choice2="No"
          choice3="NA"
        />
        <QuestionUnit
          question="Interested?"
          choice1="Yes"
          choice2="No"
          choice3="NA"
        />

        <QuestionUnit
          question="What is the primary spoken language??"
          choice1="English"
          choice2="Spanish"
          choice3="Mandarin"
        />
        <Box textAlign="center" my={2}>
          <Button variant="contained" size="large">
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AssessmentPanel;
