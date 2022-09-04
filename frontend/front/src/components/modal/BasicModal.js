import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../features/modal/basicModalSlice";

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

export default function BasicModal(props) {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleOpen = () => dispatch(openModal());
  const handleClose = () => dispatch(closeModal());

  return (
    <div>
      <Button color='inherit' onClick={handleOpen}>
        {props.title}
      </Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Box
            p={3}
            display='flex'
            justifyContent='space-evenly'
            alignItems='center'
          >
            <Button onClick={handleClose}>YES</Button>
            <Button onClick={handleClose}>NO</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
