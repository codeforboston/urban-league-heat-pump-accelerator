import { Box, Button, IconButton, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ContainerTitle from "../component/ContainerTitle";
import { Link } from "react-router-dom";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import UserTable from "./UserTable";

const User = () => {
  return (
    <ContainerTitle name={"USERS"}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box m={3} display="flex" alignItems="center">
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            helperText="Search by Address, ZipCode, Surevyor, Status"
          />
          <IconButton color="inherit">
            <SearchIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
        <Box m={2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            to="createUser"
          >
            Create New User
          </Button>
        </Box>
      </Box>
      <UserTable />
    </ContainerTitle>
  );
};

export default User;
