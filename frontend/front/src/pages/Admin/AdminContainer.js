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
import { ProtectedRoute } from "../../routing/ProtectedRoute";
import { ROLE_ADMIN } from "../../features/login/loginUtils";
import React from "react";
import Survey from "./survey/Survey";
import SurveyProfile from "./survey/SurveyProfile";
import Unassigned from "./assignment/Unassigned";
import User from "./user/User";
import UserProfile from "./user/UserProfile";

const wrapWithAuth = (child) => (
  <ProtectedRoute allowedRoles={[ROLE_ADMIN]}>{child}</ProtectedRoute>
);

const AdminContainer = () => {
  return (
    <Box>
      <Button color="inherit" component={Link} to="/">
        <Typography>selection menu</Typography>
      </Button>
      <Box>
        <Nav />
        <Routes>
          <Route path="/*" element={wrapWithAuth(<Dashboard />)}></Route>
          <Route path="home" element={wrapWithAuth(<Home />)}></Route>
          <Route
            path="home/homeprofile/:hid"
            element={wrapWithAuth(<HomeProfile />)}
          ></Route>
          <Route
            path="home/createHome"
            element={wrapWithAuth(<CreateNewHome />)}
          ></Route>
          <Route path="user" element={wrapWithAuth(<User />)}></Route>
          <Route
            path="user/userprofile/:uid"
            element={wrapWithAuth(<UserProfile />)}
          ></Route>
          <Route
            path="user/createUser"
            element={wrapWithAuth(<CreateNewUser />)}
          ></Route>
          <Route path="survey" element={wrapWithAuth(<Survey />)}></Route>
          <Route
            path="survey/:uid"
            element={wrapWithAuth(<SurveyProfile />)}
          ></Route>
          <Route
            path="assignment"
            element={wrapWithAuth(<Assignment />)}
          ></Route>
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
