import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import AccountDetail from "./AccountDetail";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/login/loginSlice";
import { useGetSurveyorByEmailQuery } from "../../../api/apiSlice";
import Loader from "../../../components/Loader";
import CustomSnackbar from "../../../components/CustomSnackbar";

const Account = () => {
  const { email } = useSelector(selectCurrentUser);

  const {
    data: accountData,
    isError: isAccountDataError,
    isLoading: isAccountDataLoading,
  } = useGetSurveyorByEmailQuery(email);

  return (
    <Box>
      {isAccountDataLoading ? (
        <Loader />
      ) : isAccountDataError ? (
        <CustomSnackbar
          open={isAccountDataError}
          message="Error fetching account data."
          severity="error"
        />
      ) : (
        <>
          <Grid container direction="column" rowSpacing={1}>
            <Grid item xs={12}>
              <Box display="flex" px={2} pt={3}>
                <Typography variant="h2" component="h2">
                  My Account
                </Typography>
              </Box>
            </Grid>
            <AccountDetail label="First Name" value={accountData.firstname} />
            <AccountDetail label="Last Name" value={accountData.lastname} />
            <AccountDetail label="Email" value={accountData.email} />
            <AccountDetail label="Address" value={accountData.street_address} />
            <AccountDetail label="Phone Number" value={accountData.phone} />
          </Grid>
          <Grid container direction="column" rowSpacing={4}>
            <Grid item xs={12}>
              <Box display="flex" mt={3} mb={2} px={2}>
                <Button variant="contained" component={Link} to="edit">
                  Edit
                </Button>
              </Box>
              <Box p={1} sx={{ borderBottom: "1px dashed grey" }} />
              <Box display="flex" mt={3} mb={2} px={2}>
                <Button variant="contained" disabled={true}>
                  Request New Assignment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Account;
