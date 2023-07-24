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
import SurveyEditor from "./survey/SurveyProfile";
import SurveyVisit from "./home/SurveyVisitProfile";
import Unassigned from "./assignment/Unassigned";
import User from "./user/User";
import UserProfile from "./user/UserProfile";
import * as routes from "../../routing/routes";

const AdminContainer = () => {
  const location = useLocation();

  const tabValue = useMemo(() => {
    const splitPathname = location.pathname.split("/");
    if (splitPathname.length > 2) {
      return splitPathname[2];
    }
    return routes.ADMIN_HOME;
  }, [location.pathname]);

  return (
    <Box>
      <Box>
        <Nav />
        <Tabs value={tabValue}>
          <Tab
            label="HOMES"
            value={routes.ADMIN_HOME}
            component={Link}
            to={routes.ADMIN_HOME}
          />
          <Tab
            label="USERS"
            value={routes.ADMIN_USER}
            component={Link}
            to={routes.ADMIN_USER}
          />
          <Tab
            label="SURVEYS"
            value={routes.ADMIN_SURVEY}
            component={Link}
            to={routes.ADMIN_SURVEY}
          />
          <Tab
            label="ASSIGNMENTS"
            value={routes.ADMIN_ASSIGNMENT}
            component={Link}
            to={routes.ADMIN_ASSIGNMENT}
          />
        </Tabs>
        <BreadcrumbNav />
        <Routes>
          <Route path={routes.ADMIN_HOME} element={<Home />} />
          <Route path={routes.adminHomeProfile()} element={<HomeProfile />} />
          <Route path={routes.ADMIN_CREATE_HOME} element={<CreateNewHome />} />
          <Route path={routes.ADMIN_USER} element={<User />} />
          <Route path={routes.adminUserProfile()} element={<UserProfile />} />
          <Route path={routes.ADMIN_CREATE_USER} element={<CreateNewUser />} />
          <Route path={routes.ADMIN_SURVEY} element={<Survey />} />
          <Route path={routes.ADMIN_ASSIGNMENT} element={<Assignment />} />
          <Route path={routes.adminSurveyEdit()} element={<SurveyEditor />} />
          <Route path={routes.adminSurveyVisit()} element={<SurveyVisit />} />
          <Route
            path={routes.adminAssignmentProfile()}
            element={<AssignProfile />}
          />
          <Route
            path={routes.ADMIN_ASSIGNMENT_UNASSIGNED}
            element={<Unassigned />}
          />
          <Route index element={<Navigate to={routes.ADMIN_HOME} />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminContainer;
