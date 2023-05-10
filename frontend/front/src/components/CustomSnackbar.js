import { Snackbar, Alert } from "@mui/material";

function CustomSnackbar({ open, onClose, message, severity }) {
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    );
  }

  export default CustomSnackbar;