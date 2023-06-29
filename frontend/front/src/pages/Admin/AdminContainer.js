import { Box, Button, Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";

import AssignProfile from "./assignment/AssignProfile";
import Assignment from "./assignment/Assignment";
import CreateNewHome from "./home/CreateNewHome";
import CreateNewUser from "./user/CreateNewUser";
import Dashboard from "./dashboard/Dashboard";
import Home from "./home/Home";
import HomeProfile from "./home/HomeProfile";
import Nav from "./nav/Nav";
import React from "react";
import Survey from "./survey/Survey";
import SurveyProfile from "./survey/SurveyProfile";
import Unassigned from "./assignment/Unassigned";
import User from "./user/User";
import UserProfile from "./user/UserProfile";
import { BreadcrumbNav } from "../../features/breadcrumb/BreadcrumbNav";

const AdminContainer = () => {
  return (
    <Box>
      <Box>
        <Nav />
        <BreadcrumbNav />
        <Routes>
          <Route path="/*" element={<Dashboard />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="home/homeprofile/:hid" element={<HomeProfile />}></Route>
          <Route path="home/createHome" element={<CreateNewHome />}></Route>
          <Route path="user" element={<User />}></Route>
          <Route path="user/userprofile/:uid" element={<UserProfile />}></Route>
          <Route path="user/createUser" element={<CreateNewUser />}></Route>
          <Route path="survey" element={<Survey />}></Route>
          <Route path="survey/:uid" element={<SurveyProfile />}></Route>
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
