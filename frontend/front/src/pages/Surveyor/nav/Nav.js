import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import LeftDrawer from "./LeftDrawer";
const Nav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <LeftDrawer />

          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            DASHBOARD
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
