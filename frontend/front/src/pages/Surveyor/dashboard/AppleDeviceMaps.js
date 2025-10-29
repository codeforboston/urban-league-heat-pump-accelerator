import { Button, Modal, Typography, Box } from "@mui/material";
import React from "react";
import { generateAppleMapsLink, generateGoogleMapsLink } from "../map/mapUtils";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export function AppleDeviceMaps(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAppleMapsBtn = () => {
    window.open(generateAppleMapsLink(props.locations), "_blank");
    handleClose();
  };
  const handleGoogleMapsBtn = () => {
    window.open(generateGoogleMapsLink(props.locations), "_blank");
    handleClose();
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        disabled={props.checked.length === 0}
      >
        GENERATE ROUTE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Box>
            <Typography
              id="modal-modal-title"
              variant="body1"
              component="h2"
              align="center"
            >
              Which map application would you like to use?
            </Typography>
          </Box>
          <Box p={2} display="flex" flexDirection="column" gap="16px">
            <Button
              size="large"
              variant="contained"
              onClick={handleAppleMapsBtn}
            >
              Apple Maps
            </Button>
            <Button
              size="large"
              variant="contained"
              onClick={handleGoogleMapsBtn}
            >
              Google Maps (recommended)
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
