import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import AccountDetail from "./AccountDetail";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Account = () => {
  const { firstName, lastName, email, address, phoneNumber } = useSelector(
    (state) => state.account
  );
  return (
    <Box>
      <Grid container direction="column" rowSpacing={1}>
        <Grid item xs={12}>
          <Box display="flex" px={2} pt={3}>
            <Typography variant="h2" component="h2">
              My Account
            </Typography>
          </Box>
        </Grid>
        <AccountDetail label="First Name" value={firstName} />
        <AccountDetail label="Last Name" value={lastName} />
        <AccountDetail label="Email" value={email} />
        <AccountDetail label="Address" value={address} />
        <AccountDetail label="Phone Number" value={phoneNumber} />
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
    </Box>
  );
};

export default Account;
