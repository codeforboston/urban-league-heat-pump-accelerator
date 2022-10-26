import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import LeftDrawer from "./LeftDrawer";
const Nav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Box ml='auto' sx={{ display: { xs: "block", sm: "none" } }}>
            <LeftDrawer />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Button color='inherit' component={Link} to='dashboard'>
              <Typography variant='h6' component='div'>
                DASHBOARD
              </Typography>
            </Button>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button color='inherit' component={Link} to='account'>
              <Typography variant='h6'>ACCOUNT</Typography>
            </Button>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button color='inherit' component={Link} to='house'>
              <Typography variant='h6'>HOUSE PROFILE</Typography>
            </Button>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button color='inherit' component={Link} to=''>
              <Typography variant='h6'>LOGOUT</Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
