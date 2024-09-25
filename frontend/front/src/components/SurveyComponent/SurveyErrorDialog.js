import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function SurveyErrorDialog({ open }) {
  const [dialogOpen, setDialogOpen] = useState(open);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setDialogOpen(open);
  }, [open]);

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="survey-error-dialog-title"
      >
        <DialogTitle id="survey-error-dialog-title">
          {"Error submitting survey"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your progress been saved. Please wait a moment and try submitting
            again.{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setDialogOpen(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
