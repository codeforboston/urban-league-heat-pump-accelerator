import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "./nav/Nav";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import Account from "./account/Account";
import HouseProfile from "./houseProfile/HouseProfile";
import EditAccount from "./account/edit/EditAccount";
import { AuthenticatedRoute } from "./nav/AuthenticatedRoute";

const SurveyorContainer = () => {
  const { authenticated } = useSelector((state) => state.login);
  console.log(authenticated);
  return (
    <Box>
      {authenticated ? <Nav /> : ""}
      <Box sx={{ maxWidth: "800px" }} m='auto'>
        <Routes>
          <Route
            path='/'
            element={<Login />}>
          </Route>
          <Route
            path='dashboard'
            element={<AuthenticatedRoute component={<Dashboard />} />}>
          </Route>
          <Route
            path='account'
            element={<AuthenticatedRoute component={<Account />} />}>
          </Route>
          <Route
            path='account/edit'
            element={<AuthenticatedRoute component={<EditAccount />} />}>
          </Route>
          <Route
            path='house'
            element={<AuthenticatedRoute component={<HouseProfile />} />}>
          </Route>
        </Routes>
      </Box>
    </Box >
  );
};

export default SurveyorContainer;
