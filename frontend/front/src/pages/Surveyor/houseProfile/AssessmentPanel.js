import React from "react";
import { Box, Button } from "@mui/material";

import QuestionUnit from "./question/QRadio";

const AssessmentPanel = () => {
  return (
    <>
      <Box>
        <QuestionUnit
          question='Visited?'
          label1='Yes'
          label2='No'
          label3='NA'
        />
        <QuestionUnit
          question='Talked with Owner?'
          label1='Yes'
          label2='No'
          label3='NA'
        />
        <QuestionUnit
          question='Was Home?'
          label1='Yes'
          label2='No'
          label3='NA'
        />
        <QuestionUnit
          question='Interested?'
          label1='Yes'
          label2='No'
          label3='NA'
        />

        <QuestionUnit
          question='What is the primary spoken language??'
          label1='English'
          label2='Spanish'
          label3='Mandarin'
        />
        <Box textAlign='center' my={2}>
          <Button variant='contained' size='large'>
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AssessmentPanel;
