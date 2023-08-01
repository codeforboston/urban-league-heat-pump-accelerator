import { Route, Routes } from "react-router-dom";

import AssignProfile from "./assignment/AssignProfile";
import Assignment from "./assignment/Assignment";
import { Box, ThemeProvider } from "@mui/material";
import { BreadcrumbNav } from "../../features/breadcrumb/BreadcrumbNav";
import CreateNewHome from "./home/CreateNewHome";
import CreateNewUser from "./user/CreateNewUser";
import Dashboard from "./dashboard/Dashboard";
import Home from "./home/Home";
import HomeProfile from "./home/HomeProfile";
import Nav from "./nav/Nav";
import React from "react";
import Survey from "./survey/Survey";
import SurveyEditor from "./survey/SurveyProfile";
import SurveyVisit from "./home/SurveyVisitProfile";
import Unassigned from "./assignment/Unassigned";
import User from "./user/User";
import UserProfile from "./user/UserProfile";
import adminTheme from "../Public/Assets/adminTheme";

const AdminContainer = () => {
  return (
    <ThemeProvider theme={adminTheme}>
      <Box mb={"36px"}>
        <Box>
          <Nav />
          <BreadcrumbNav />
          <Routes>
            <Route path="/*" element={<Dashboard />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route
              path="home/homeprofile/:hid"
              element={<HomeProfile />}
            ></Route>
            <Route path="home/createHome" element={<CreateNewHome />}></Route>
            <Route path="user" element={<User />}></Route>
            <Route
              path="user/userprofile/:uid"
              element={<UserProfile />}
            ></Route>
            <Route path="user/createUser" element={<CreateNewUser />}></Route>
            <Route path="survey" element={<Survey />}></Route>
            <Route path="survey/edit/:uid" element={<SurveyEditor />}></Route>
            <Route path="survey/visit/:uid" element={<SurveyVisit />}></Route>
            <Route path="assignment" element={<Assignment />}></Route>
            <Route
              path="assignment/assignProfile/:aid"
              element={<AssignProfile />}
            ></Route>{" "}
            <Route
              path="assignment/unassigned"
              element={<Unassigned />}
            ></Route>
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminContainer;
