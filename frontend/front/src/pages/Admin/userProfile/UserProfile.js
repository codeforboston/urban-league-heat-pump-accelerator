import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ConfirmationModal from "../../Developer/confirmModal/ConfirmationModal";

const UserProfile = () => {
  const { uid } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const confirmDelete = () => {
    setDeleteModal(false);
  };
  const cancelDelete = () => {
    setDeleteModal(false);
  };

  // Conditional Buttons
  let changePasswordButton, editButton, deleteButton;
  if (!editMode) {
    changePasswordButton = <Button variant="contained" sx={{ ml: 2 }}>CHANGE PASSWORD</Button>
    editButton = <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setEditMode(true)}>EDIT</Button>
    deleteButton = <Button variant="outlined" sx={{ ml: 2 }} color="error" onClick={() => setDeleteModal(true)}>DELETE</Button>
  } else {
    editButton = <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setEditMode(false)}>SAVE</Button>
    deleteButton = <Button variant="outlined" sx={{ ml: 2 }} color="error" onClick={() => setEditMode(false)}>CANCEL</Button>
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <ConfirmationModal
        isOpen={deleteModal}
        handleConfirm={() => confirmDelete()}
        handleCancel={() => cancelDelete()}
        confirmBtnText="Delete"
        cancelBtnText="Cancel"
        title="Confirm Delete"
        message="Please confirm to delete this user."
      />
      <Box width={500} mt={5}>
        <Box sx={{ bgcolor: "primary.main", color: "white" }} p={1}>
          <Typography variant="h5">User Profile</Typography>
          {/* Could add user ID to header. */}
          {/* Can't be edited, but could be helpful to display. */}
        </Box>
        <TextField
          disabled={!editMode}
          label="First Name"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          disabled={!editMode}
          label="Last Name"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          disabled={!editMode}
          label="Email"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          disabled={!editMode}
          label="Phone"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />
        <TextField
          disabled={!editMode}
          label="Street Address"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />{" "}
        <TextField
          disabled={!editMode}
          label="City"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />{" "}
        <TextField
          disabled={!editMode}
          label="Zip Code"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />{" "}
        <TextField
          disabled={!editMode}
          label="State"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
        />

        {/* BUTTONS */}
        <Box sx={{ "display": "flex", "justify-content": "space-between" }}>
          <Box pt={5} textAlign="left">
            {changePasswordButton}
          </Box>
          <Box pt={5} textAlign="right">
            {editButton}
            {deleteButton}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
