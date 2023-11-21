import { Navigate, Route, Routes } from "react-router-dom";

import Account from "./account/Account";
import { Box } from "@mui/material";
import Dashboard from "./dashboard/Dashboard";
import EditAccount from "./account/edit/EditAccount";
import HouseProfile from "./houseProfile/HouseProfile";
import SurveyVisitProfile from "../Admin/home/SurveyVisitProfile";
import Nav from "./nav/Nav";
import React, { useMemo } from "react";
import { selectIsLoggedIn } from "../../features/login/loginSlice";
import { useSelector } from "react-redux";
import { BackButton } from "./Components/BackButton";
import { useLocation } from "react-router-dom";
import { SURVEYOR_DASHBOARD_ROUTE } from "../../routing/routes";

const SurveyorContainer = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  const locationIsDashbord = useMemo(
    () => location.pathname === SURVEYOR_DASHBOARD_ROUTE,
    [location]
  );

  return (
    <Box>
      {isLoggedIn ? <Nav /> : ""}
      {!locationIsDashbord && (
        <BackButton url={SURVEYOR_DASHBOARD_ROUTE} description="dashboard" />
      )}
      <Box sx={{ maxWidth: "800px" }} m="auto">
        <Routes>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="account/edit" element={<EditAccount />}></Route>
          <Route path="house/:id" element={<HouseProfile />}></Route>
          <Route
            path="survey/visit/:uid"
            element={<SurveyVisitProfile readonly />}
          ></Route>
          <Route
            path="/*"
            element={<Navigate to={SURVEYOR_DASHBOARD_ROUTE} />}
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default SurveyorContainer;
