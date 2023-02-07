import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ConfirmationModal from "../../Developer/confirmModal/ConfirmationModal";
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const { uid } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // react-hook-forms
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log("SUBMITTED");
    setEditMode(false);
  }

  const confirmDelete = () => {
    setDeleteModal(false);
    // make api call to delete the user profile here
  };
  const cancelDelete = () => {
    setDeleteModal(false);
  };

  // Conditional Buttons
  let formControlButtons;
  if (!editMode) {
    formControlButtons = (
      <Box pt={5} textAlign="right">
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => setEditMode(true)}
        >
          EDIT
        </Button>
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          color="error"
          onClick={() => setDeleteModal(true)}
        >
          DELETE
        </Button>
      </Box>
    )
  } else {
    formControlButtons = (
      <Box pt={5} textAlign="right">
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          // onClick={() => setEditMode(false)}
          onClick={() => onSubmit()}
        >
          SAVE
        </Button>
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          color="error"
          onClick={() => setEditMode(false)}
        >
          CANCEL
        </Button>
      </Box>
    )
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
          disabled={!editMode}
          label="First Name"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
          {...register("firstName")}
          />
          <TextField
            disabled={!editMode}
            label="Last Name"
            variant="standard"
            sx={{ width: "95%", mx: 2, mt: 3 }}
            {...register("lastName")}
          />
          <TextField
            disabled={!editMode}
            label="Email"
            variant="standard"
            sx={{ width: "95%", mx: 2, mt: 3 }}
            {...register("email")}
          />
          <TextField
            disabled={!editMode}
            label="Phone"
            variant="standard"
            sx={{ width: "95%", mx: 2, mt: 3 }}
            {...register("phoneNumber")}
          />
          <TextField
            disabled={!editMode}
            label="Street Address"
            variant="standard"
            sx={{ width: "95%", mx: 2, mt: 3 }}
            {...register("streetAddress")}
          />
          <TextField
            disabled={!editMode}
            label="City"
            variant="standard"
            sx={{ width: "95%", mx: 2, mt: 3 }}
            {...register("city")}
          />
          <TextField
            disabled={!editMode}
            label="Zip Code"
            variant="standard"
            sx={{ width: "95%", mx: 2, mt: 3 }}
            {...register("zipCode")}
          />
          <TextField
            disabled={!editMode}
            label="State"
            variant="standard"
            sx={{ width: "95%", mx: 2, mt: 3 }}
            {...register("state")}
          />

          {/* BUTTONS */}
          <Box sx={{ display: "flex", "justify-content": "space-between" }}>
            <Box pt={5} textAlign="left">
              <Button
                variant="contained" sx={{ ml: 2 }}
                disabled={editMode}
              >
                CHANGE PASSWORD
              </Button>
            </Box>
            {formControlButtons}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UserProfile;
