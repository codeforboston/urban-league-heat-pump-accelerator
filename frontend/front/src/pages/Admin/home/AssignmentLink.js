import { Box, Button, Tooltip } from "@mui/material";
import { useState } from "react";

export default function AssignmentLink({ id }) {
  // Tooltip functions
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip
      sx={{
        width: "100%",
        height: "100%",
      }}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      title={`Go to assignment ${id}`}
      placement="left"
      className="goToAssignment"
    >
      <Button variant="outlined" className="goToAssignment">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          className="goToAssignment"
        >
          {id}
        </Box>
      </Button>
    </Tooltip>
  );
}
