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
import { useDispatch, useSelector } from "react-redux";
import BasicModal from "../modal/BasicModal";
import { closeModal } from "../../features/modal/basicModalSlice";

const Nav = () => {
  const { title } = useSelector((state) => state.nav);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeModal());

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
          <BasicModal title='Login'>
            <Box
              p={3}
              display='flex'
              justifyContent='space-evenly'
              alignItems='center'
            >
              <Button variant='contained' onClick={handleClose}>
                YES
              </Button>
              <Button variant='contained' onClick={handleClose}>
                NO
              </Button>
            </Box>
          </BasicModal>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
