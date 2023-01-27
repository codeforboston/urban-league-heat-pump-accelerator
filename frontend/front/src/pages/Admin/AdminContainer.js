import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Dashboard from "./dashboard/Dashboard";
import Nav from "./nav/Nav";
import UserProfile from "./userProfile/UserProfile";
import HomeProfile from "./homeProfile/HomeProfile";
import CreateNewUser from "./user/CreateNewUser";
import CreateNewHome from "./home/CreateNewHome";
import Home from "./home/Home";
import User from "./user/User";

const AdminContainer = () => {
  return (
    <Box>
      <Button color="inherit" component={Link} to="/">
        <Typography>selection menu</Typography>
      </Button>
      <Box>
        <Nav />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>

          <Route path="/home" element={<Home />}></Route>
          <Route path="/user" element={<User />}></Route>

          <Route path="homeprofile/:hid" element={<HomeProfile />}></Route>
          <Route path="userprofile/:uid" element={<UserProfile />}></Route>
          <Route path="createHome" element={<CreateNewHome />}></Route>

          <Route path="createUser" element={<CreateNewUser />}></Route>
        </Routes>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default AdminContainer;
