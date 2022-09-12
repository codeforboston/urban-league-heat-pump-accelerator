import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

const WrapperModal = (props) => {
  return (
    <Box>
      {props.children}

      <Modal
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box>
            <Box py={3}>
              <Typography variant='h2'>{props.title}</Typography>
            </Box>
            <Box py={3}>
              <Typography variant='h4'>{props.message}</Typography>
            </Box>

            <Box
              p={3}
              display='flex'
              justifyContent='space-evenly'
              alignItems='center'
            >
              <Button variant='contained' onClick={props.handleConfirm}>
                YES
              </Button>
              <Button variant='contained' onClick={props.handleCancel}>
                NO
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default WrapperModal;
