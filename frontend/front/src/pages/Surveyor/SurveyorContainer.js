import { Navigate, Route, Routes } from "react-router-dom";

import Account from "./account/Account";
import { Box } from "@mui/material";
import Dashboard from "./dashboard/Dashboard";
import EditAccount from "./account/edit/EditAccount";
import HouseProfile from "./houseProfile/HouseProfile";
import SurveyVisit from "./survey/SurveyVisit";
import Nav from "./nav/Nav";
import React from "react";
import { selectIsLoggedIn } from "../../features/login/loginSlice";
import { useSelector } from "react-redux";

const SurveyorContainer = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Box>
      {isLoggedIn ? <Nav /> : ""}
      <Box sx={{ maxWidth: "800px" }} m="auto">
        <Routes>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="account/edit" element={<EditAccount />}></Route>
          <Route path="house/:id" element={<HouseProfile />}></Route>
          <Route path="survey/visit/:id" element={<SurveyVisit />}></Route>
          <Route path="/*" element={<Navigate to="/surveyor/dashboard" />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default SurveyorContainer;
