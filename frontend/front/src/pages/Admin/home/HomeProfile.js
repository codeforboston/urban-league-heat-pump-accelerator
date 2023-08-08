import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../src/components/Loader.js";
import {
  useDeleteHomeMutation,
  useGetHomeQuery,
  useUpdateHomeMutation,
} from "../../../api/apiSlice";
import CustomSnackbar from "../../../components/CustomSnackbar";
import ConfirmationModal from "../../../components/confirmationModal/ConfirmationModal.js";
import { AdminBackButton } from "../../Surveyor/Components/AdminBackButton";

const HomeProfile = () => {
  const { hid } = useParams();
  const navigate = useNavigate();

  // Home data loading and mutation
  const {
    data: homeData,
    isLoading: isHomeDataLoading,
    isError: isHomeDataError,
  } = useGetHomeQuery(hid);
  const [
    updateHome,
    { isLoading: updateHomeInProg, isError: updateHomeError },
  ] = useUpdateHomeMutation();
  const [
    deleteHome,
    { isLoading: deleteHomeInProg, isError: deleteHomeError },
  ] = useDeleteHomeMutation();

  //states
  const [editMode, setEditMode] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postError, setPostError] = useState(false);
  const [erroMessage, setErrorMessage] = useState("");

  //form
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      street_number: homeData?.street_number || "",
      street_name: homeData?.street_name || "",
      unit_number: homeData?.unit_number || "",
      city: homeData?.city || "",
      zip_code: homeData?.zip_code || "",
      building_type: homeData?.building_type || "",
    },
  });

  //handlers
  const cancelHandler = () => {
    setEditMode(false);
    reset();
  };

  const modalCloseHandler = () => {
    setModalIsOpen(false);
  };
  const deleteHandler = () => {
    setModalIsOpen(false);
    deleteHome(homeData);
    if (deleteHomeError) {
      setPostError(true);
      setErrorMessage("Error deleting home!");
      return;
    }
    navigate("/admin/home");
  };

  const onSubmit = (data) => {
    const updatedHomeData = {
      ...homeData,
      street_number: data.street_number,
      street_name: data.street_name,
      unit_number: data.unit_number,
      city: data.city,
      zip_code: data.zip_code,
      building_type: data.building_type,
    };
    updateHome(updatedHomeData);
    if (updateHomeError) {
      setPostError(true);
      setErrorMessage("Error saving home!");
    }
    setPostError(false);
    setEditMode(false);
  };

  //side effect
  useEffect(() => {
    if (homeData) {
      reset(homeData);
    }
  }, [homeData, reset]);

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
        onClick={() => {
          setModalIsOpen(true);
        }}
        disabled={deleteHomeInProg}
      >
        {deleteHomeInProg ? "DELETING..." : "DELETE"}
      </Button>
    );
  } else {
    saveButton = (
      <Button
        variant="outlined"
        sx={{ ml: 2 }}
        disabled={!isDirty || updateHomeInProg ? true : false}
        type="submit"
      >
        {updateHomeInProg ? "SAVING..." : "SAVE"}
      </Button>
    );
    deleteButton = (
      <Button
        variant="outlined"
        sx={{ ml: 2 }}
        color="error"
        onClick={cancelHandler}
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
      <AdminBackButton url="/admin/home" description="homes" />
      {isHomeDataLoading ? (
        <Loader />
      ) : isHomeDataError ? (
        <CustomSnackbar
          severity="error"
          open={isHomeDataError}
          message="Error Loading data"
        />
      ) : (
        <>
          <ConfirmationModal
            isOpen={modalIsOpen}
            onClose={modalCloseHandler}
            title="confirm Delete"
            message="Please confirm you want to delete this house"
            handleCancel={modalCloseHandler}
            handleConfirm={deleteHandler}
          />
          <Box width={500} mt={5}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box sx={{ bgcolor: "primary.main", color: "white" }} p={1}>
                <Typography variant="h5">Home Profile: {hid}</Typography>
              </Box>
              <Controller
                name="street_number"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    label="Street Number"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="street_name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    label="Street Name"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="unit_number"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    label="Unit #"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    label="City"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="zip_code"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    label="Zip Code"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="building_type"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    disabled={!editMode}
                    label="Building Type"
                    variant="standard"
                    sx={{ width: "95%", mx: 2, mt: 3 }}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {/* BUTTONS */}
              <Box pt={5} textAlign="right">
                <Button variant="outlined" sx={{ ml: 2 }}>
                  <Link style={{ textDecoration: "none", color: "inherit" }}>
                    View Survey
                  </Link>
                </Button>
                {editButton}
                {saveButton}
                {deleteButton}
              </Box>
              {postError ?? (
                <Alert severity="error" sx={{ my: 2 }}>
                  {erroMessage}
                </Alert>
              )}
            </form>
          </Box>
        </>
      )}
    </Box>
  );
};

export default HomeProfile;
