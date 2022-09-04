import React, { useState } from "react";
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

const Login = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <Button color='inherit' onClick={handleOpen}>
        <Typography variant='h5'>LOGIN</Typography>
      </Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box>
            <Box>
              <Typography variant='h1'>Login23</Typography>
            </Box>

            <Box
              p={3}
              display='flex'
              justifyContent='space-evenly'
              alignItems='center'
            >
              <Button variant='contained' onClick={handleClose}>
                YES
              </Button>
              <Button variant='contained' onClick={handleClose}>
                NO
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
