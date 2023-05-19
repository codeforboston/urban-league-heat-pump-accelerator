import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useGetHomeQuery } from "../../../api/apiSlice";

const HomeProfile = () => {
  const { hid } = useParams();

  // Load home data
  const {
    data: homeData,
    isLoading: isHomeDataLoading,
    error: homeError,
  } = useGetHomeQuery(hid);

  console.log(homeData);

  const [editMode, setEditMode] = useState(false);

  // Conditional Buttons
  let editButton, deleteButton;
  if (!editMode) {
    editButton = (
      <Button
        variant="outlined"
        sx={{ ml: 2 }}
        onClick={() => setEditMode(true)}
      >
        EDIT
      </Button>
    );
    deleteButton = (
      <Button variant="outlined" sx={{ ml: 2 }} color="error">
        DELETE
      </Button>
    );
  } else {
    editButton = (
      <Button
        variant="outlined"
        sx={{ ml: 2 }}
        onClick={() => setEditMode(false)}
      >
        SAVE
      </Button>
    );
    deleteButton = (
      <Button
        variant="outlined"
        sx={{ ml: 2 }}
        color="error"
        onClick={() => setEditMode(false)}
      >
        CANCEL
      </Button>
    );
  }

  if (isHomeDataLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
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
          <Typography variant="h5">Home Profile: {hid}</Typography>
        </Box>
        <TextField
          disabled={!editMode}
          label="Street Number"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
          value={homeData.street_number}
        />
        <TextField
          disabled={!editMode}
          label="Street Name"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
          value={homeData?.street_name}
        />
        <TextField
          disabled={!editMode}
          label="City"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
          value={homeData?.city}
        />
        <TextField
          disabled={!editMode}
          label="Zip Code"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
          value={homeData?.zip_code}
        />
        <TextField
          disabled={!editMode}
          label="Building Type"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
          value={homeData?.building_type}
        />
        <TextField
          disabled={!editMode}
          label="Owner"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
          value={homeData?.owner}
        />
        <TextField
          disabled={!editMode}
          label="Year Built"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
          value={homeData?.year_built}
        />
        <TextField
          disabled={!editMode}
          label="Heat Type"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
          value={homeData?.heat_type}
        />
        <TextField
          disabled={!editMode}
          label="Heat Fuel"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
          value={homeData?.heat_fuel}
        />
        <TextField
          disabled={!editMode}
          label="Surveyor ID"
          variant="standard"
          sx={{ width: "95%", mx: 2, mt: 3 }}
          value={homeData?.surveyor_id}
        />
        {/* BUTTONS */}
        <Box pt={5} textAlign="right">
          {editButton}
          {deleteButton}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeProfile;
