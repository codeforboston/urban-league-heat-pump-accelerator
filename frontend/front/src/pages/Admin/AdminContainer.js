import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import Dashboard from "./dashboard/Dashboard";
import House from "./house/House";
import Nav from "./nav/Nav";

const AdminContainer = () => {
  return (
    <Box>
      <Button color='inherit' component={Link} to='/'>
        <Typography>selection menu</Typography>
      </Button>
      <Box>
        <Nav />
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='house' element={<House />}></Route>
        </Routes>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default AdminContainer;
