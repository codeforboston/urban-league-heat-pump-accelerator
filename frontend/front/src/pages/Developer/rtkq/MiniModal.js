import React from "react";
import { Dialog, DialogTitle } from "@mui/material";

/**
 * Just a little modal for fun, used mostly as a loading indicator
 */
export const MiniModal = ({ onClose, open, dialog }) => {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{dialog}</DialogTitle>
    </Dialog>
  );
};
