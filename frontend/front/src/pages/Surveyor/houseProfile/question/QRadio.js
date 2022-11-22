import { Box, Radio, Typography } from "@mui/material";
import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const QuestionUnit = (props) => {
  let choice1 = "";
  let choice2 = "";
  let choice3 = "";
  let choice4 = "";

  if (props.choice1) {
    choice1 = (
      <MyFormControlLabel
        value={props.choice1}
        label={props.choice1}
        control={<Radio />}
        sx={{
          border: 1,
          mt: 1,
          marginLeft: 0,
          marginRight: 0,
          bgcolor: "white",
        }}
      />
    );
  }
  if (props.choice2) {
    choice2 = (
      <MyFormControlLabel
        value={props.choice2}
        label={props.choice2}
        control={<Radio />}
        sx={{
          border: 1,
          mt: 1,
          marginLeft: 0,
          marginRight: 0,
          bgcolor: "white",
        }}
      />
    );
  }

  if (props.choice3) {
    choice3 = (
      <MyFormControlLabel
        value={props.choice3}
        label={props.choice3}
        control={<Radio />}
        sx={{
          border: 1,
          mt: 1,
          marginLeft: 0,
          marginRight: 0,
          bgcolor: "white",
        }}
      />
    );
  }

  if (props.choice4) {
    choice4 = (
      <MyFormControlLabel
        value={props.choice4}
        label={props.choice4}
        control={<Radio />}
        sx={{
          border: 1,
          mt: 1,
          marginLeft: 0,
          marginRight: 0,
          bgcolor: "white",
        }}
      />
    );
  }
  return (
    <Box mt={2}>
      <Box>
        <Typography>{props.question}</Typography>
      </Box>
      <RadioGroup name='use-radio-group' defaultValue=''>
        {choice1}
        {choice2}
        {choice3}
        {choice4}
      </RadioGroup>
    </Box>
  );
};

export default QuestionUnit;
