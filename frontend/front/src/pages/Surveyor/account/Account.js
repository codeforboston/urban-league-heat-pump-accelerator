import { Box, Button, Stack } from "@mui/material";

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ContainerTitle from "../../Admin/component/ContainerTitle";
import AccountDetail from "./AccountDetail";

const Account = () => {
  const { firstName, lastName, email, address, phoneNumber } = useSelector(
    (state) => state.account
  );
  return (
    <>
      <ContainerTitle name="My Account">
        <Stack direction="column" gap={1}>
          <AccountDetail label="First Name" value={firstName} />
          <AccountDetail label="Last Name" value={lastName} />
          <AccountDetail label="Email" value={email} />
          <AccountDetail label="Address" value={address} />
          <AccountDetail label="Phone Number" value={phoneNumber} />
        </Stack>

        <Stack direction="column">
          <Box display="flex" mt={3} mb={2} px={2}>
            <Button variant="contained" component={Link} to="edit">
              Edit
            </Button>
          </Box>
          {/*
          <Box p={1} sx={{ borderBottom: "1px dashed grey" }} />
          <Box display="flex" mt={3} mb={2} px={2}>
            
            --Feature will not implemented on backend
            <Button variant="contained" disabled={true}>
              Request New Assignment
            </Button>
          </Box>
  */}
        </Stack>
      </ContainerTitle>
    </>
  );
};

export default Account;
