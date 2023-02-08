import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Dashboard from "./dashboard/Dashboard";
import Nav from "./nav/Nav";
import UserProfile from "./user/UserProfile";
import HomeProfile from "./home/HomeProfile";
import CreateNewUser from "./user/CreateNewUser";
import CreateNewHome from "./home/CreateNewHome";
import Home from "./home/Home";
import User from "./user/User";
import OnlineSurvey from "./onlinesurvey/OnlineSurvey";
import OnlineSurveyProfile from "./onlinesurvey/OnlineSurveyProfile";
import Assignment from "./assignment/Assignment";
import AssignProfile from "./assignment/AssignProfile";

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
          <Route path="home/homeprofile/:hid" element={<HomeProfile />}></Route>
          <Route path="home/createHome" element={<CreateNewHome />}></Route>

          <Route path="/user" element={<User />}></Route>
          <Route path="user/userprofile/:uid" element={<UserProfile />}></Route>
          <Route path="user/createUser" element={<CreateNewUser />}></Route>

          <Route path="/onlinesurvey" element={<OnlineSurvey />}></Route>
          <Route
            path="onlinesurveyprofile/:uid"
            element={<OnlineSurveyProfile />}
          ></Route>
          <Route path="assignment" element={<Assignment />}></Route>
          <Route
            path="assignment/assignProfile/:aid"
            element={<AssignProfile />}
          ></Route>
        </Routes>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default AdminContainer;
