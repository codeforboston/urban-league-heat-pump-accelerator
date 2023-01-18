import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Dashboard from "./dashboard/Dashboard";
import Nav from "./nav/Nav";
import UserProfile from "./userProfile/UserProfile";
import HomeProfile from "./homeProfile/HomeProfile";
import CreateNewUser from "./dashboard/userTab/CreateNewUser";
import CreateNewHome from "./dashboard/homeTab/CreateNewHome";

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
          {/* <Route
            path='houseprofile/:hid/'
            element={<HouseProfile />}
          ></Route> */}
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
