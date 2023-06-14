import * as routes from "../../routing/routes";

import { Navigate, Route, Routes } from "react-router-dom";

import Account from "./account/Account";
import { Box } from "@mui/material";
import Dashboard from "./dashboard/Dashboard";
import EditAccount from "./account/edit/EditAccount";
import HouseProfile from "./houseProfile/HouseProfile";
import Map from "./map/Map";
import Nav from "./nav/Nav";
import { ProtectedRoute } from "../../routing/ProtectedRoute";
import { ROLE_SURVEYOR } from "../../features/login/loginUtils";
import React from "react";
import { selectIsLoggedIn } from "../../features/login/loginSlice";
import { useSelector } from "react-redux";

const wrapWithAuth = (child) => (
  <ProtectedRoute
    redirectTo={routes.LOGIN_ROUTE}
    allowedRoles={[ROLE_SURVEYOR]}
  >
    {child}
  </ProtectedRoute>
);

const SurveyorContainer = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Box>
      {isLoggedIn ? <Nav /> : ""}
      <Box sx={{ maxWidth: "800px" }} m="auto">
        <Routes>
          <Route path="/*" element={<Navigate to="/surveyor/dashboard" />} />
          <Route path="dashboard" element={wrapWithAuth(<Dashboard />)}></Route>
          <Route path="account" element={wrapWithAuth(<Account />)}></Route>
          <Route
            path="account/edit"
            element={wrapWithAuth(<EditAccount />)}
          ></Route>
          <Route
            path="house/:id"
            element={wrapWithAuth(<HouseProfile />)}
          ></Route>
        </Routes>
      </Box>
    </Box>
  );
};

export default SurveyorContainer;
