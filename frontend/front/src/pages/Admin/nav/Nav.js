import React from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  // const { title } = useSelector((state) => state.nav);
  const theme = useTheme();
  console.log(theme);
  // const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Button color='inherit' component={Link} to=''>
              <Typography variant='h6'>ADMIN</Typography>
            </Button>
          </Typography>
          <Button color='inherit' component={Link} to=''>
            <Typography variant='h6'>LOGOUT</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
