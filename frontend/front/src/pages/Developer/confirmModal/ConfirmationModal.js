import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";

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

const ConfirmationModal = (props) => {
  return (
    <Box>
      {props.children}
      <Modal
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Box>
              <Typography variant="h5">{props.title}</Typography>
            </Box>
            <Divider />
            <Box py={3}>
              <Typography variant="body1">{props.message}</Typography>
            </Box>

            <Box
              p={3}
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Button
                variant="contained"
                onClick={props.handleCancel}
                color="primary"
              >
                {props.cancelBtnText ? props.cancelBtnText : "no"}
              </Button>
              <Button
                variant="contained"
                onClick={props.handleConfirm}
                color="error"
              >
                {props.confirmBtnText ? props.confirmBtnText : "yes"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ConfirmationModal;
