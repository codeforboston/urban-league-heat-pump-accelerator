import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import React from "react";
import { useLogoutUserMutation } from "../../../api/apiSlice";

const Nav = () => {
  const [logout] = useLogoutUserMutation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/surveyor/dashboard">
              <Typography variant="h7">SURVEYOR MODE</Typography>
            </Button>
          </Box>
          <Button
            color="inherit"
            component={Link}
            onClick={logout}
            sx={{ minWidth: "max-content" }}
          >
            <Typography variant="h6">LOG OUT</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
