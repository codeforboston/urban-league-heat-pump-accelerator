import { Box, Button, IconButton, TextField } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import UserTable from "./UserTable";
import { Link } from "react-router-dom";

const User = () => {
  return (
    <Box>
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
            to="createuser"
          >
            Create New User
          </Button>
        </Box>
      </Box>
      <UserTable />
    </Box>
  );
};

export default User;
