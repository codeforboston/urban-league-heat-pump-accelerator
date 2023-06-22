import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import ConfirmationModal from "../../Developer/confirmModal/ConfirmationModal";
import { useForm, Controller } from "react-hook-form";
import { useGetSurveyorQuery } from "../../../api/apiSlice";
import Loader from "../../../components/Loader";
import CustomSnackbar from "../../../components/CustomSnackbar";
import { AdminBackButton } from "../../Surveyor/Components/AdminBackButton";

const UserProfile = () => {
  const { uid } = useParams();
  const {
    data: surveyorData,
    isLoading: isSurveyorDataLoading,
    isError: isSurveyorError,
  } = useGetSurveyorQuery(uid);
  const [editMode, setEditMode] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // react-hook-forms
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      state: "",
    },
  });
  const onSubmit = (data) => {
    setEditMode(false);
  };

  // deleteModal
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
    );
  } else {
    formControlButtons = (
      <Box pt={5} textAlign="right">
        <Button variant="outlined" sx={{ ml: 2 }} onClick={() => onSubmit()}>
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
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <AdminBackButton description="users" url="/admin/user" />
      {isSurveyorDataLoading ? (
        <Loader />
      ) : isSurveyorError ? (
        <CustomSnackbar
          open={isSurveyorError}
          message="Error fetching surveyor data."
          severity="error"
        />
      ) : (
        <>
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
              <Typography variant="h5">User Profile: {uid}</Typography>
              {/* Could add user ID to header. */}
              {/* Can't be edited, but could be helpful to display. */}
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name={"firstName"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    onChange={onChange}
                    value={surveyorData?.firstname || value}
                    label="First Name"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                  />
                )}
              />
              <Controller
                name={"lastName"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    onChange={onChange}
                    value={surveyorData?.lastname || value}
                    label="Last Name"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                  />
                )}
              />
              <Controller
                name={"email"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    onChange={onChange}
                    value={surveyorData?.email || value}
                    label="Email"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                  />
                )}
              />
              <Controller
                name={"phone"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    onChange={onChange}
                    value={surveyorData?.phone || value}
                    label="Phone"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                  />
                )}
              />
              <Controller
                name={"streetAddress"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    onChange={onChange}
                    value={surveyorData?.street_address || value}
                    label="Street Address"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                  />
                )}
              />
              <Controller
                name={"city"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    onChange={onChange}
                    value={surveyorData?.city || value}
                    label="City"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                  />
                )}
              />
              <Controller
                name={"zipCode"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    onChange={onChange}
                    value={surveyorData?.zipcode || value}
                    label="Zip Code"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                  />
                )}
              />
              <Controller
                name={"state"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    onChange={onChange}
                    value={surveyorData?.state || value}
                    label="State"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                  />
                )}
              />

              {/* BUTTONS */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box pt={5} textAlign="left">
                  <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    disabled={editMode}
                  >
                    CHANGE PASSWORD
                  </Button>
                </Box>
                {formControlButtons}
              </Box>
            </form>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserProfile;
