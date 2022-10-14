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

const QuestionUnit = () => {
  return (
    <Box mt={2}>
      <Box>
        <Typography>Question 1 </Typography>
      </Box>
      <RadioGroup name='use-radio-group' defaultValue=''>
        <MyFormControlLabel
          value='first'
          label='First'
          control={<Radio />}
          sx={{
            border: 1,
            mt: 1,
            marginLeft: 0,
            marginRight: 0,
            bgcolor: "white",
          }}
        />

        <MyFormControlLabel
          value='second'
          label='Second'
          control={<Radio />}
          sx={{
            border: 1,
            mt: 1,
            marginLeft: 0,
            marginRight: 0,
            bgcolor: "white",
          }}
        />
        <MyFormControlLabel
          value='third'
          label='third'
          control={<Radio />}
          sx={{
            border: 1,
            mt: 1,
            marginLeft: 0,
            marginRight: 0,
            bgcolor: "white",
          }}
        />
        <MyFormControlLabel
          value='fourth'
          label='fourth'
          control={<Radio />}
          sx={{
            border: 1,
            mt: 1,
            marginLeft: 0,
            marginRight: 0,
            bgcolor: "white",
          }}
        />
      </RadioGroup>
    </Box>
  );
};

export default QuestionUnit;
