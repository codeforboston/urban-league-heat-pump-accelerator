import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { clearData, restoreData } from "../../features/about/aboutSlice";
import { useDispatch } from "react-redux";
import useModal from "../../hooks/useModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ClearCartModal = (props) => {
  const dispatch = useDispatch();
  const { handleOpen, handleClose, isOpen } = useModal();



  const handleRestoreData = () => {
    handleClose();
    dispatch(restoreData());
  };


  return (
    <Box>
      <Button variant='outlined' onClick={handleOpen}>
        <Typography>Restore Data</Typography>
      </Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box>
            <Box py={3}>
              <Typography variant='h2'>Restore Data</Typography>
            </Box>

            <Box
              p={3}
              display='flex'
              justifyContent='space-evenly'
              alignItems='center'
            >
              <Button variant='contained' onClick={handleRestoreData}>
                YES
              </Button>
              <Button variant='contained' onClick={handleClose}>
                NO
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ClearCartModal;
