import { Box, Button, IconButton, TextField } from "@mui/material";
import React from "react";
import UserTable from "./UserTable";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const User = () => {
  return (
    <Box>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box m={3} display='flex' alignItems='center'>
          <TextField
            id='standard-basic'
            label='Filter'
            variant='standard'
            helperText='Filter by Address, ZipCode, Surevyor, Status'
          />
          <IconButton color='inherit'>
            <SearchIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
        <Box m={2}>
          <Button variant='contained' startIcon={<AddIcon />}>
            Create New User
          </Button>
        </Box>
      </Box>

      <UserTable />
    </Box>
  );
};

export default User;
