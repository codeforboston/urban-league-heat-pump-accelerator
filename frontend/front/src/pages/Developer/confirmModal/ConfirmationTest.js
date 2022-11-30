import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

const ConfirmationTest = () => {
  const [isOpen, setIsOpen] = useState(false);

  const confirm = () => {
    setIsOpen(false);
  };
  const cancel = () => {
    setIsOpen(false);
  };
  return (
    <Box pt={5} textAlign="center">
      <Box>
        <ConfirmationModal
          isOpen={isOpen}
          handleConfirm={() => confirm()}
          handleCancel={() => cancel()}
          confirmBtnText="delete"
          cancelBtnText="cancel"
          title="Confirm Delete"
          message="Please confirm to delete this item"
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => setIsOpen(true)}
          >
            Delete
          </Button>
        </ConfirmationModal>
      </Box>

      <Box></Box>
    </Box>
  );
};

export default ConfirmationTest;
