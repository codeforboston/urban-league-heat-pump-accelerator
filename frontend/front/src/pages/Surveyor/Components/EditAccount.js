import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import CustomSnackbar from "../../../components/CustomSnackbar";
import { SURVEYOR_DASHBOARD_ROUTE } from "../../../routing/routes";
import { useUpdateSurveyorMutation } from "../../../api/apiSlice";
import {
  validatePhoneNumber,
  validateZipCode,
} from "../../../util/stringUtils";

const EditAccount = ({ surveyorData }) => {
  const { firstName, lastName, phone, streetAddress, city, zipCode, state } =
    surveyorData;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      firstName,
      lastName,
      phone,
      streetAddress,
      city,
      zipCode,
      state,
    },
  });

  const paperStyle = {
    padding: 40,
    display: "flex",
    flexDirection: "column",
    width: 280,
    margin: "20px auto",
  };

  const btnstyle = { margin: "10px 0" };

  const [
    updateSurveyor,
    {
      isLoading: updateSurveyorProg,
      isSuccess: updateSurveyorSuccess,
      isError: updateSurveyorError,
    },
  ] = useUpdateSurveyorMutation();

  async function EditAccountForms(values) {
    if (!values) return;
    const newSurveyorData = {
      ...surveyorData,
      firstname: values.firstName,
      lastname: values.lastName,
      phone: values.phone,
      street_address: values.streetAddress,
      city: values.city,
      zipcode: values.zipCode,
    };
    const updatedSurveyorData = await updateSurveyor(newSurveyorData).unwrap();
    if (updatedSurveyorData) {
      reset({
        firstName: updatedSurveyorData.firstName,
        lastName: updatedSurveyorData.lastName,
        phone: updatedSurveyorData.phone,
        streetAddress: updatedSurveyorData.streetAddress,
        city: updatedSurveyorData.city,
        zipCode: updatedSurveyorData.zipCode,
        state: updatedSurveyorData.state,
      });
    }
  }
  return (
    <Box>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <h2>Update Account Details?</h2>
        </Grid>

        <form onSubmit={handleSubmit(EditAccountForms)}>
          <TextField
            id="account-first-name"
            placeholder="Enter First Name"
            type="text"
            style={btnstyle}
            name="firstName"
            fullWidth
            label="First Name"
            variant="standard"
            defaultValue={firstName}
            {...register("firstName", {
              required: {
                value: true,
                message: "Please Enter First Name",
              },
            })}
            error={!!errors?.firstName}
            helperText={!!errors?.firstName && errors?.firstName?.message}
          />
          <TextField
            id="account-last-name"
            placeholder="Enter Last Name"
            type="text"
            style={btnstyle}
            name="lastName"
            fullWidth
            label="Last Name"
            variant="standard"
            defaultValue={lastName}
            {...register("lastName", {
              required: {
                value: true,
                message: "Please Enter Last Name",
              },
            })}
            error={!!errors?.lastName}
            helperText={!!errors?.lastName && errors?.lastName?.message}
          />
          <TextField
            id="account-phone-number"
            placeholder="Enter Phone Number"
            type="tel"
            style={btnstyle}
            name="phone"
            fullWidth
            label="Phone Number"
            variant="standard"
            defaultValue={phone}
            {...register("phone", {
              required: "Phone number is required",
              validate: validatePhoneNumber,
            })}
            error={!!errors?.phone}
            helperText={!!errors?.phone && errors?.phone?.message}
          />
          <TextField
            id="account-street-address"
            placeholder="Enter Street Address"
            type="text"
            style={btnstyle}
            name="streetAddress"
            fullWidth
            label="Street Address"
            variant="standard"
            defaultValue={streetAddress}
            {...register("streetAddress", {
              required: {
                value: true,
                message: "Please Enter Street Address",
              },
            })}
            error={!!errors?.streetAddress}
            helperText={
              !!errors?.streetAddress && errors?.streetAddress?.message
            }
          />
          <TextField
            id="account-state"
            placeholder="Enter State"
            type="text"
            style={btnstyle}
            name="state"
            fullWidth
            label="State"
            variant="standard"
            defaultValue={state}
            {...register("state", {
              required: {
                value: true,
                message: "Please Enter State",
              },
            })}
            error={!!errors?.state}
            helperText={!!errors?.state && errors?.state?.message}
          />
          <TextField
            id="account-zip-code"
            placeholder="Enter Zip Code"
            type="text"
            style={btnstyle}
            name="zipCode"
            fullWidth
            label="Zip Code"
            variant="standard"
            defaultValue={zipCode}
            {...register("zipCode", {
              required: "Please Enter Zip Code",
              validate: validateZipCode,
            })}
            error={!!errors?.zipCode}
            helperText={!!errors?.zipCode && errors?.zipCode?.message}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => EditAccountForms}
            style={{
              btnstyle,
              borderRadius: "20px",
              marginTop: "20px",
            }}
            fullWidth
            disabled={
              !isDirty || updateSurveyorProg || Object.keys(errors).length > 0
            }
          >
            Save
          </Button>
          <Button
            type="button"
            color="error"
            variant="contained"
            onClick={() =>
              isDirty
                ? reset({
                    firstName,
                    lastName,
                    phone,
                    streetAddress,
                    city,
                    zipCode,
                    state,
                  })
                : navigate(SURVEYOR_DASHBOARD_ROUTE)
            }
            style={{
              btnstyle,
              borderRadius: "20px",
              marginTop: "20px",
            }}
            fullWidth
          >
            Cancel
          </Button>
        </form>
        {updateSurveyorSuccess && (
          <CustomSnackbar
            severity="success"
            message="Account updated successfully!"
          />
        )}
        {updateSurveyorError && (
          <CustomSnackbar severity="error" message="Error updating account!" />
        )}
      </Paper>
    </Box>
  );
};

export default EditAccount;
