import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import UserTable from "./UserTable";
import { Link } from "react-router-dom";
import ContainerAdmin from "../component/ContainerAdmin";

const User = () => {
  return (
    <ContainerAdmin>
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
    </ContainerAdmin>
  );
};

export default User;
