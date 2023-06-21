import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { Grid, Paper, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { selectCurrentUser } from "../../../../features/login/loginSlice";
import {
  useGetSurveyorQuery,
  useUpdateSurveyorMutation,
} from "../../../../api/apiSlice";
import Loader from "../../../../components/Loader";
import CustomSnackbar from "../../../../components/CustomSnackbar";
import { HeatPumpPhoneField } from "../../../../components/SurveyComponent/HeatPumpPhoneField";
import { HeatPumpTextField } from "../../../../components/SurveyComponent/HeatPumpTextField";

// Styles
const verticalMargin = { margin: "10px 0" };
const paperStyle = {
  padding: 40,
  display: "flex",
  flexDirection: "column",
  width: 280,
  margin: "20px auto",
};

const EditAccount = () => {
  const navigate = useNavigate();

  // Get account data
  const { id } = useSelector(selectCurrentUser);
  // RTK Query
  const {
    data: {
      firstname: firstName,
      lastname: lastName,
      email,
      street_address: address,
      phone: phoneNumber,
    },
    isError: isAccountDataError,
    isLoading: isAccountDataLoading,
  } = useGetSurveyorQuery(id);

  const [
    updateAccount,
    {
      data: accountUpdateResult,
      isError: isUpdateAccountError,
      isLoading: isUpdatingAccount,
    },
  ] = useUpdateSurveyorMutation();

  // react-hook-form
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      firstName,
      lastName,
      email,
      address,
      phoneNumber: phoneNumber,
    },
  });

  // Action handling
  const handleUpdateAccount = useCallback(
    async (values) => {
      const updatedAccount = await updateAccount({
        id,
        body: {
          surveyor: {
            firstname: values.firstName,
            lastname: values.lastName,
            phone: values.phoneNumber,
            email: values.email,
            street_address: values.address,
          },
        },
      });
      return updatedAccount;
    },
    [updateAccount, id]
  );

  async function editAccountForms(values) {
    if (!values) return;
    handleUpdateAccount(values);
    reset();
    navigate("../account");
  }

  return (
    <Box>
      {isAccountDataLoading || isUpdatingAccount ? (
        <Loader />
      ) : isAccountDataError ? (
        <CustomSnackbar
          open={isAccountDataError}
          message="Error fetching account data."
          severity="error"
        />
      ) : isUpdateAccountError ? (
        <CustomSnackbar
          open={isUpdateAccountError}
          message="Error updating account data."
          severity="error"
        />
      ) : (
        <Paper elevation={5} style={paperStyle}>
          <Grid align="center">
            <h2>Update Account Details?</h2>
          </Grid>

          <form onSubmit={handleSubmit(editAccountForms)}>
            <HeatPumpTextField
              control={control}
              name="firstName"
              label="First Name"
              required="Please enter first name."
              fullWidth
              sx={verticalMargin}
            />
            <HeatPumpTextField
              control={control}
              name="lastName"
              label="Last Name"
              required="Please enter last name."
              fullWidth
              sx={verticalMargin}
            />
            <HeatPumpTextField
              control={control}
              name="email"
              label="Email Address"
              required="Please enter email address."
              fullWidth
              type="email"
              sx={verticalMargin}
            />
            <HeatPumpTextField
              control={control}
              name="address"
              label="Address"
              required="Please enter address."
              fullWidth
              sx={verticalMargin}
            />
            <HeatPumpPhoneField
              name="phoneNumber"
              control={control}
              label="Phone Number"
              fullWidth
              sx={verticalMargin}
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => editAccountForms}
              style={{
                verticalMargin,
                borderRadius: "20px",
                marginTop: "20px",
              }}
              fullWidth
            >
              Save
            </Button>
            <Button
              type="button"
              color="error"
              variant="contained"
              onClick={() => editAccountForms}
              style={{
                verticalMargin,
                borderRadius: "20px",
                marginTop: "20px",
              }}
              fullWidth
              component={Link}
              to="../account"
            >
              Cancel
            </Button>
          </form>
        </Paper>
      )}
    </Box>
  );
};

export default EditAccount;
