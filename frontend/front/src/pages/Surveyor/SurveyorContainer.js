import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "./nav/Nav";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import Account from "./account/Account";

const SurveyorContainer = () => {
  const { authenticated } = useSelector((state) => state.login);
  console.log(authenticated);
  return (
    <Box>
      {authenticated ? <Nav /> : ""}
      <Box sx={{ maxWidth: "800px" }} m="auto">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="account" element={<Account />}></Route>
        </Routes>
      </Box>
    </Box>
  );
};

export default SurveyorContainer;
