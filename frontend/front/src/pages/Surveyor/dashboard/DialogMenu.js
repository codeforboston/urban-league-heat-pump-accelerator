import * as React from "react";

import { Box, Button, IconButton } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";
import { blue } from "@mui/material/colors";

function SimpleDialog(props) {
  const { handleClose, selectedValue, open } = props;

  const handleListItemClick = () => {
    handleClose(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box p={1}>
        <DialogTitle textAlign={"center"}>
          <Box>
            <Box>{`${selectedValue.street_number} ${selectedValue.street_name}`}</Box>
            <Box>{`${selectedValue.city} ${selectedValue.zip_code}`}</Box>
          </Box>
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => handleListItemClick(selectedValue.GIS_ID)}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "white", color: blue[600] }}>
                  <ClearIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Disable"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Button
        variant="contained"
        ml="auto"
        mr="auto"
        size="large"
        onClick={handleClose}
      >
        Close
      </Button>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default function DialogMenu(props) {
  const [open, setOpen] = React.useState(false);
  // no idea what this is used for...
  // eslint-disable-next-line no-unused-vars
  const [selectedValue, setSelectedValue] = React.useState(props.value);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <MoreVertIcon />
      </IconButton>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
}
