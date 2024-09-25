import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { Link } from "react-router-dom";
import ContainerTitle from "../component/ContainerTitle";
import UserTable from "./UserTable";

const User = () => {
  return (
    <ContainerTitle name={"USERS"}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
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
