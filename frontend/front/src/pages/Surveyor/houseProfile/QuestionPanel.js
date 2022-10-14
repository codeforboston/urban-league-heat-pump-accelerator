import React from "react";
import { Box, Button } from "@mui/material";

import QuestionUnit from "./question/QuestionUnit";

const QuestionPanel = () => {
  return (
    <>
      <Box>
        <QuestionUnit />
        <QuestionUnit />
        <QuestionUnit />
        <QuestionUnit />

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
