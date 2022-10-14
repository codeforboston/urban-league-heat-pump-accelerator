import React from "react";
import { Box, Button, Radio, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import QuestionUnit from "./question/QuestionUnit";

// const StyledFormControlLabel = styled((props) => (
//   <FormControlLabel {...props} />
// ))(({ theme, checked }) => ({
//   ".MuiFormControlLabel-label": checked && {
//     color: theme.palette.primary.main,
//   },
// }));

// function MyFormControlLabel(props) {
//   const radioGroup = useRadioGroup();

//   let checked = false;

//   if (radioGroup) {
//     checked = radioGroup.value === props.value;
//   }

//   return <StyledFormControlLabel checked={checked} {...props} />;
// }

const CorePanel = () => {
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

export default CorePanel;
