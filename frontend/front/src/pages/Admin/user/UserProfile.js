import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useParams } from "react-router-dom";
import {
  useGetSurveyorQuery,
  useUpdateSurveyorMutation,
} from "../../../api/apiSlice";
import CustomSnackbar from "../../../components/CustomSnackbar";
import Loader from "../../../components/Loader";
import ConfirmationModal from "../../../components/confirmationModal/ConfirmationModal";
import { ADMIN_USER, withAdminPrefix } from "../../../routing/routes";
import { AdminBackButton } from "../../Surveyor/Components/AdminBackButton";

const UserProfile = () => {
  //surveyor data
  const { uid } = useParams();
  const {
    data: surveyorData,
    isLoading: isSurveyorDataLoading,
    isError: isSurveyorError,
  } = useGetSurveyorQuery(uid);
  const [updateSurveyor, { isLoading: updateSurveyorProg }] =
    useUpdateSurveyorMutation();

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
      phone: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      state: "",
    },
  });

  //event handlers
  const onSubmit = (data, e) => {
    e.preventDefault();
    const newSurveyorData = {
      ...surveyorData,
      firstname: data.firstName,
      lastname: data.lastName,
      phone: data.phone,
      street_address: data.streetAddress,
      city: data.city,
      zipcode: data.zipCode,
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
  const confirmDeactivate = () => {
    setDeleteModal(false);
    // make api call to delete the user profile here
    const newSurveyorData = {
      ...surveyorData,
      status: "inactive",
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
  const activateUser = (e) => {
    e.preventDefault();
    const newSurveyorData = {
      ...surveyorData,
      status: "active",
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
  const cancelDelete = () => {
    setDeleteModal(false);
  };

  //side effects
  //set form default values after data fetch
  useEffect(() => {
    if (surveyorData) {
      reset({
        firstName: surveyorData.firstName,
        lastName: surveyorData.lastName,
        phone: surveyorData.phone,
        streetAddress: surveyorData.streetAddress,
        city: surveyorData.city,
        zipCode: surveyorData.zipCode,
        state: surveyorData.state,
      });
    }
  }, [reset, surveyorData]);

  // Conditional Buttons
  let editButton, saveButton, deactivateButton;

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
    if (surveyorData?.status === "active") {
      deactivateButton = (
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          color="error"
          onClick={() => setDeleteModal(true)}
          disabled={updateSurveyorProg}
        >
          DEACTIVATE
        </Button>
      );
    } else {
      deactivateButton = (
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          color="success"
          onClick={activateUser}
        >
          ACTIVATE
        </Button>
      );
    }
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
    deactivateButton = (
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
          message="Error fetching surveyor data."
          severity="error"
        />
      ) : (
        <>
          <ConfirmationModal
            isOpen={deleteModal}
            handleConfirm={() => confirmDeactivate()}
            handleCancel={() => cancelDelete()}
            confirmBtnText="Deactivate"
            cancelBtnText="Cancel"
            title="Confirm Deactivation"
            message="Please confirm to deactivate this user."
          />
          <Box maxWidth={500} my={5} px={2}>
            <Box sx={{ bgcolor: "primary.main", color: "white" }} p={2}>
              <Typography variant="h5" mb={1}>
                User Profile: {surveyorData.email}
              </Typography>
              <Typography variant="h6">
                Status: {surveyorData.status}
              </Typography>
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
                    sx={{ width: "95%", mx: 1, mt: 3 }}
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
                    sx={{ width: "95%", mx: 1, mt: 3 }}
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
                    value={value}
                    label="Phone"
                    variant="standard"
                    sx={{ width: "95%", mx: 1, mt: 3 }}
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
                    sx={{ width: "95%", mx: 1, mt: 3 }}
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
                    sx={{ width: "95%", mx: 1, mt: 3 }}
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
                    sx={{ width: "95%", mx: 1, mt: 3 }}
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
                    sx={{ width: "95%", mx: 1, mt: 3 }}
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
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {/*
                <Box pt={5} textAlign="left">
                  <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    disabled={editMode}
                  >
                    CHANGE PASSWORD
                  </Button>
                </Box>
              */}
                <Box pt={5} textAlign="right">
                  {editButton}
                  {saveButton}
                  {deactivateButton}
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
