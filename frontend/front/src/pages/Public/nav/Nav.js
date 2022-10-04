import React from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DrawerComp from './Drawer'

const Nav = () => {
  const { title } = useSelector((state) => state.nav);
  const theme = useTheme();
    console.log(theme);
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
    console.log(isMatch);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
            {
              isMatch ? (
                <>
                  <DrawerComp/>
                </>
              ) : (
                <>
                  <Button color='inherit' component={Link} to=''>
                    <Typography variant='h5'>HOME</Typography>
                  </Button>
                  <Button color='inherit' component={Link} to='about'>
                    <Typography variant='h5'>ABOUT</Typography>
                  </Button>
                  <Button color='inherit' component={Link} to='contact'>
                    <Typography variant='h5'>Contact</Typography>
                  </Button>
                  <Button color='inherit' component={Link} to='cta'>
                    <Typography variant='h5'>Learn More</Typography>
                  </Button>
                </>
              )
            }

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
