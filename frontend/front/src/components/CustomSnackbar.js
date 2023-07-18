import { Alert, Snackbar } from "@mui/material";

import { useState } from "react";

function CustomSnackbar({
  message = "This is an error Snackbar",
  severity = "error",
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={() => setIsOpen(false)}
    >
      <Alert severity={severity} onClose={() => setIsOpen(false)}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
