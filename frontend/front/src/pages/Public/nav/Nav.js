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

            {
              isMatch ? (
                <>
                  <Typography fontWeight='medium' textSize='20' component='div' sx={{ flexGrow: 1 }}>
                    {title}
                  </Typography>
                  <DrawerComp/>
                </>
              ) : (
                <>
                  <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    {title}
                  </Typography>
                  <Button color='inherit' component={Link} to=''>
                    <Typography variant='h6'>HOME</Typography>
                  </Button>
                  <Button color='inherit' component={Link} to='about'>
                    <Typography variant='h6'>ABOUT</Typography>
                  </Button>
                  <Button color='inherit' component={Link} to='contact'>
                    <Typography variant='h6'>CONTACT</Typography>
                  </Button>
                  <Button variant="contained" color="success" component={Link} to='info'>
                    <Typography variant='h6' component='div'>LEARN MORE</Typography>
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
