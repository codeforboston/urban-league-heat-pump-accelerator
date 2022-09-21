import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const { title } = useSelector((state) => state.nav);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color='inherit' component={Link} to='/'>
            <Typography variant='h5'>HOME</Typography>
          </Button>
          <Button color='inherit' component={Link} to='/about'>
            <Typography variant='h5'>ABOUT</Typography>
          </Button>
          <Button color='inherit' component={Link} to='/contact'>
            <Typography variant='h5'>Contact</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
