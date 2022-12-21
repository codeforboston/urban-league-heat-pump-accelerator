import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseByName,
  deleteDataByName,
  increaseByName,
  removeItems,
} from "../../../features/about/aboutSlice";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const getRandomColor = () => {
  var letters = "BCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const AboutUnit = (props) => {
  const dispatch = useDispatch();
  return (
    <Grid
      item
      xs={12}
      md={6}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        width={200}
        height={"auto"}
        p={2}
        display='flexColumn'
        justifyContent='center'
        alignItems='center'
        m={1}
        sx={{ backgroundColor: getRandomColor() }}
      >
        <Typography>{props.item.name}</Typography>
        <Typography>Age: {props.item.age}</Typography>
        <Typography>Color: {props.item.color}</Typography>
        <Typography>Hometown: {props.item.hometown}</Typography>

        <Box p={1} display='flex'>
          <Button
            variant='outlined'
            onClick={() => {
              dispatch(increaseByName(props.item.name));
            }}
          >
            <ArrowUpwardIcon />
          </Button>
          <Box px={2}>
            <Typography>{props.item.num}</Typography>
          </Box>
          <Button
            variant='outlined'
            onClick={() => {
              if (props.item.num === 0) {
                return;
              }
              dispatch(decreaseByName(props.item.name));
            }}
          >
            <ArrowDownwardIcon />
          </Button>
        </Box>
        <Box p={1}>
          <Button
            variant='outlined'
            onClick={() => {
              dispatch(deleteDataByName(props.item.name));
            }}
          >
            delete
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default AboutUnit;
