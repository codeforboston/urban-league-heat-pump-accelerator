import React, { useEffect } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AboutUnit from "./AboutUnit";
import {
  addNumber,
  clearNumber,
  subNumber,
  fetchData,
  clearData,
  restoreData,
  calcTotal,
} from "../../features/about/aboutSlice";
import BasicModal from "../../components/modal/BasicModal";

const About = () => {
  const dispatch = useDispatch();
  const { title, array, number, totalNum } = useSelector(
    (state) => state.about
  );

  useEffect(() => {
    dispatch(fetchData());
    console.log("fetchData");
  }, [dispatch]);

  useEffect(() => {
    dispatch(calcTotal());
  }, [dispatch, array]);
  
  const arrayAbout = array.map((item) => {
    return <AboutUnit item={item} key={item.name} />;
  });

  let numberDisplay;

  if (number === 0) {
    numberDisplay = <Typography variant='h3'>Empty number</Typography>;
  } else {
    numberDisplay = <Typography variant='h3'>Number:{number} </Typography>;
  }

  return (
    <Box p={1} m={1}>
      <Typography variant='h2'>{title} </Typography>
      <Box p={1} m={1}>
        {numberDisplay}
      </Box>
      <Box>
        <Button
          variant='outlined'
          sx={{ margin: 1 }}
          onClick={() => dispatch(clearNumber())}
        >
          Clear number
        </Button>
        <Button
          variant='outlined'
          sx={{ margin: 1 }}
          onClick={() => dispatch(addNumber())}
        >
          Add number
        </Button>
        <Button
          variant='outlined'
          sx={{ margin: 1 }}
          onClick={() => dispatch(subNumber())}
        >
          Subtract number
        </Button>
      </Box>
      <Box>
        <Typography variant='h3'>Total Number: {totalNum}</Typography>
      </Box>
      <Box>
        <Button
          variant='outlined'
          sx={{ margin: 1 }}
          onClick={() => dispatch(clearData())}
        >
          Clear Data
        </Button>

        <Button
          variant='outlined'
          sx={{ margin: 1 }}
          onClick={() => dispatch(restoreData())}
        >
          Restore Data
        </Button>
      </Box>

      <Grid
        container
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        {arrayAbout}
      </Grid>
    </Box>
  );
};

export default About;
