import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteSurveyorMutation,
  useGetSurveyorQuery,
  useUpdateSurveyorMutation,
} from "../../../api/apiSlice";
import CustomSnackbar from "../../../components/CustomSnackbar";
import Loader from "../../../components/Loader";
import ConfirmationModal from "../../../components/confirmationModal/ConfirmationModal";
import { ADMIN_USER, withAdminPrefix } from "../../../routing/routes";
import { AdminBackButton } from "../../Surveyor/Components/AdminBackButton";

const UserProfile = () => {
  const navigate = useNavigate();
  //surveyor data
  const { uid } = useParams();
  const {
    data: surveyorData,
    isLoading: isSurveyorDataLoading,
    isError: isSurveyorError,
  } = useGetSurveyorQuery(uid);
  const [updateSurveyor, { isLoading: updateSurveyorProg }] =
    useUpdateSurveyorMutation();

  const [deleteUser, { isLoading: deleteUserProg }] =
    useDeleteSurveyorMutation();

  //states
  const [editMode, setEditMode] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [upduteUserSuccess, setUpdateUserSucess] = useState(false);

  // react-hook-forms
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
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
    const newSurveyorData = {
      ...surveyorData,
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      street_address: data.street_address,
      city: data.city,
    };
    updateSurveyor(newSurveyorData)
      .unwrap()
      .then(() => {
        setUpdateUserSucess(true);
        setErrorStatus(false);
        setEditMode(false);
      })
      .catch(() => {
        setErrorStatus(true);
        setErrorMsg("Error saving user!");
      });
  };
  const onEditCancel = (data) => {
    setEditMode(false);
    reset();
  };

  // deleteModal
  const confirmDelete = () => {
    setDeleteModal(false);
    // make api call to delete the user profile here
    deleteUser(surveyorData)
      .unwrap()
      .then(() => {
        navigate("/admin/user");
      })
      .catch(() => {
        setErrorStatus(true);
        setErrorMsg("Error deleting user!");
      });
  };
  const cancelDelete = () => {
    setDeleteModal(false);
  };

  //side effects
  //set form default values after data fetch
  useEffect(() => {
    if (surveyorData) {
      reset({
        firstName: surveyorData.firstname,
        lastName: surveyorData.lastname,
        email: surveyorData.email,
        phone: surveyorData.phone,
        streetAddress: surveyorData.street_address,
        city: surveyorData.city,
        zipCode: surveyorData.zipcode,
        state: surveyorData.state,
      });
    }
  }, [reset, surveyorData]);
  // Conditional Buttons
  let editButton, deleteButton, saveButton;
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
      <Button
        variant="outlined"
        sx={{ ml: 2 }}
        color="error"
        onClick={() => setDeleteModal(true)}
        disabled={deleteUserProg}
      >
        {deleteUserProg ? "DELETING..." : "DELETE"}
      </Button>
    );
  } else {
    saveButton = (
      <Button
        variant="outlined"
        sx={{ ml: 2 }}
        type="submit"
        disabled={!isDirty || updateSurveyorProg ? true : false}
      >
        {updateSurveyorProg ? "SAVING..." : "SAVE"}
      </Button>
    );
    deleteButton = (
      <Button
        variant="outlined"
        sx={{ ml: 2 }}
        color="error"
        onClick={onEditCancel}
      >
        CANCEL
      </Button>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <AdminBackButton description="users" url={withAdminPrefix(ADMIN_USER)} />
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
          <Box maxWidth={500} mt={5}>
            <Box sx={{ bgcolor: "primary.main", color: "white" }} p={1}>
              <Typography variant="h5">User Profile: {uid}</Typography>
              {/* Could add user ID to header. */}
              {/* Can't be edited, but could be helpful to display. */}
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Controller
                name={"firstName"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    onChange={onChange}
                    value={value}
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
                    value={value}
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
                    value={value}
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
                    value={value}
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
                    value={value}
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
                    value={value}
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
                    value={value}
                    label="State"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                  />
                )}
              />
              {/*update result feedback*/}
              {upduteUserSuccess && (
                <Alert severity="success" sx={{ my: 2 }}>
                  User saved successfully!
                </Alert>
              )}
              {errorStatus && (
                <Alert severity="error" sx={{ my: 2 }}>
                  {errorMsg}
                </Alert>
              )}

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
                <Box pt={5} textAlign="right">
                  {editButton}
                  {saveButton}
                  {deleteButton}
                </Box>
              </Box>
            </form>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserProfile;
