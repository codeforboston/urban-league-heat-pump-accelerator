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
import Survey from "./survey/Survey";
import SurveyProfile from "./survey/SurveyProfile";
import Assignment from "./assignment/Assignment";
import AssignProfile from "./assignment/AssignProfile";
import Unassigned from "./assignment/Unassigned";

const AdminContainer = () => {
  return (
    <Box>
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
          <Route path="/survey" element={<Survey />}></Route>
          <Route path="/survey/:uid" element={<SurveyProfile />}></Route>
          <Route path="assignment" element={<Assignment />}></Route>
          <Route
            path="assignment/assignProfile/:aid"
            element={<AssignProfile />}
          ></Route>{" "}
          <Route path="assignment/unassigned" element={<Unassigned />}></Route>
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminContainer;
