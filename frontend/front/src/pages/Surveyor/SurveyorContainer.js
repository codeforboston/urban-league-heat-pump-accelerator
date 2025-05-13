import { Navigate, Route, Routes } from "react-router-dom";

import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetSurveyorQuery } from "../../api/apiSlice";
import {
  selectCurrentUser,
  selectIsLoggedIn,
} from "../../features/login/loginSlice";
import { ProtectedInactive } from "../../routing/ProtectedInactive";
import { CompletedSurvey } from "./Components/CompletedSurvey";
import InactiveSurveyor from "./Components/InactiveSurveyor";
import Account from "./account/Account";
import Dashboard from "./dashboard/Dashboard";
import HouseProfile from "./houseProfile/HouseProfile";
import Nav from "./nav/Nav";
import SurveyVisitProfile from "../../components/SurveyComponent/SurveyVisitProfile";

const SurveyorContainer = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);
  const { data: surveyorData } = useGetSurveyorQuery(currentUser.id);

  return (
    <Box>
      {isLoggedIn ? <Nav /> : ""}
      <Box sx={{ maxWidth: "800px" }} m="auto">
        <Routes>
          <Route
            element={<ProtectedInactive userStatus={surveyorData?.status} />}
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="house/:id" element={<HouseProfile />} />
            <Route
              path="survey/:uid"
              element={
                <SurveyVisitProfile
                  renderSurvey={(props) => <CompletedSurvey {...props} />}
                />
              }
            />
            <Route path="/*" element={<Navigate to="/surveyor/dashboard" />} />
          </Route>
          <Route path="inactive" element={<InactiveSurveyor />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default SurveyorContainer;
