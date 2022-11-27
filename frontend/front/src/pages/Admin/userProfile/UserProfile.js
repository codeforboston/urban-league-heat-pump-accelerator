import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { uid } = useParams();
  const [editMode, setEditMode] = useState(false);

  // Conditional Buttons
  let changePasswordButton, editButton, deleteButton;
  if (!editMode) {
    changePasswordButton = <Button variant="contained" sx={{ ml: 2 }}>CHANGE PASSWORD</Button>
    editButton = <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setEditMode(!editMode)}>EDIT</Button>
    deleteButton = <Button variant="outlined" sx={{ ml: 2 }} color="error">DELETE</Button>
  } else {
    editButton = <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setEditMode(!editMode)}>SAVE</Button>
    deleteButton = <Button variant="outlined" sx={{ ml: 2 }} color="error">CANCEL</Button>
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
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
