import React, { useEffect } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AboutUnit from "./AboutUnit";
import {
  addNumber,
  clearNumber,
  subNumber,
  fetchData,
  calcTotal,
  restoreData,
  clearData,
} from "../../features/about/aboutSlice";
import ConfirmationModal from "../../components/confirmationModal/ConfirmationModal";
import useModal from "../../hooks/useModal";

const About = () => {
  const dispatch = useDispatch();

  // useModal for confirm clear data
  const {
    handleOpen: handleOpenClear,
    handleClose: handleCloseClear,
    isOpen: isOpenClear,
  } = useModal();

  const handleConfirmClear = () => {
    handleCloseClear();
    dispatch(clearData());
  };

  // useModal for confirm restore data
  const {
    handleOpen: handleOpenRestore,
    handleClose: handleCloseRestore,
    isOpen: isOpenRestore,
  } = useModal();
  const { title, array, number, totalNum } = useSelector(
    (state) => state.about
  );

  const handleConfirmRestore = () => {
    handleCloseRestore();
    dispatch(restoreData());
  };

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

      <Box
        display='flex'
        justifyContent='space-evenly'
        alignItems='center'
        width={400}
      >
        {/* Clear Data modal */}

        <ConfirmationModal
          title={"Clear Data"}
          message={"Do you want to clear all data?"}
          handleOpen={handleOpenClear}
          handleClose={handleCloseClear}
          isOpen={isOpenClear}
          handleConfirm={handleConfirmClear}
          handleCancel={handleCloseClear}
        >
          <Button variant='outlined' onClick={handleOpenClear}>
            <Typography>Clear Data</Typography>
          </Button>
        </ConfirmationModal>

        {/* Restore Data modal */}
        <ConfirmationModal
          title={"Restore Data"}
          message={"Do you want to restore data?"}
          handleOpen={handleOpenRestore}
          handleClose={handleCloseRestore}
          isOpen={isOpenRestore}
          handleConfirm={handleConfirmRestore}
          handleCancel={handleCloseRestore}
        >
          <Button variant='outlined' onClick={handleOpenRestore}>
            <Typography>Restore Data</Typography>
          </Button>
        </ConfirmationModal>
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
