import { Snackbar, Alert } from "@mui/material";

function CustomSnackbar({
  open,
  onClose,
  message = "This is an error Snackbar",
  severity = "error",
}) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
