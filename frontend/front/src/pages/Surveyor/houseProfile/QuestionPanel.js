import React from "react";
import { Box, Button } from "@mui/material";

import QuestionUnit from "./question/QRadio";
import QTextField from "./question/QTextField";

const QuestionPanel = () => {
  return (
    <>
      <Box>
        <QuestionUnit
          question={"1. This is the first question"}
          label1='Yes'
          label2='No'
          label3='Maybe'
          label4='N/A'
        />
        <QTextField question={"Callback time?:"} />
        <QuestionUnit
          question='2. Are they interested in learning more?'
          label1='Yes'
          label2='No'
          label3='Maybe'
          label4='N/A'
        />
        <QuestionUnit
          question='Are they ready to install a heat pump?'
          label1='Yes'
          label2='No'
          label3='Maybe'
          label4='N/A'
        />
        <QuestionUnit
          question='Do they want a heat pump coach?'
          label1='Yes'
          label2='No'
          label3='Maybe'
          label4='N/A'
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

export default QuestionPanel;
