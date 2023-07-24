import { Navigate, Route, Routes, useLocation, Link } from "react-router-dom";
import AssignProfile from "./assignment/AssignProfile";
import Assignment from "./assignment/Assignment";
import { Box, Tabs, Tab } from "@mui/material";
import { BreadcrumbNav } from "../../features/breadcrumb/BreadcrumbNav";
import CreateNewHome from "./home/CreateNewHome";
import CreateNewUser from "./user/CreateNewUser";
import Home from "./home/Home";
import HomeProfile from "./home/HomeProfile";
import Nav from "./nav/Nav";
import React, { useMemo } from "react";
import Survey from "./survey/Survey";
import SurveyProfile from "./survey/SurveyProfile";
import Unassigned from "./assignment/Unassigned";
import User from "./user/User";
import UserProfile from "./user/UserProfile";

const AdminContainer = () => {
  const location = useLocation();

  const tabValue = useMemo(() => {
    const splitPathname = location.pathname.split("/");
    if (splitPathname.length > 2) {
      return splitPathname[2];
    }
    return "home";
  }, [location.pathname]);

  return (
    <Box>
      <Box>
        <Nav />
        <Tabs value={tabValue}>
          <Tab label="HOMES" value="home" component={Link} to="home" />
          <Tab label="USERS" value="user" component={Link} to="user" />
          <Tab label="SURVEYS" value="survey" component={Link} to="survey" />
          <Tab
            label="ASSIGNMENTS"
            value="assignment"
            component={Link}
            to="assignment"
          />
        </Tabs>
        <BreadcrumbNav />
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="home/homeprofile/:hid" element={<HomeProfile />} />
          <Route path="home/createHome" element={<CreateNewHome />} />
          <Route path="user" element={<User />} />
          <Route path="user/userprofile/:uid" element={<UserProfile />} />
          <Route path="user/createUser" element={<CreateNewUser />} />
          <Route path="survey" element={<Survey />} />
          <Route path="survey/:uid" element={<SurveyProfile />} />
          <Route path="assignment" element={<Assignment />} />
          <Route
            path="assignment/assignProfile/:aid"
            element={<AssignProfile />}
          />
          <Route path="assignment/unassigned" element={<Unassigned />} />
          <Route index element={<Navigate to="home" />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminContainer;
