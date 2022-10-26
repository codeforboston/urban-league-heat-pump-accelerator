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
  let label1 = "";
  let label2 = "";
  let label3 = "";
  let label4 = "";

  if (props.label1) {
    label1 = (
      <MyFormControlLabel
        value={props.label1}
        label={props.label1}
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
  if (props.label2) {
    label2 = (
      <MyFormControlLabel
        value={props.label2}
        label={props.label2}
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

  if (props.label3) {
    label3 = (
      <MyFormControlLabel
        value={props.label3}
        label={props.label3}
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

  if (props.label4) {
    label4 = (
      <MyFormControlLabel
        value={props.label4}
        label={props.label4}
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
        {label1}
        {label2}
        {label3}
        {label4}
      </RadioGroup>
    </Box>
  );
};

export default QuestionUnit;
