import "./App.css";

import * as routes from "./routing/routes";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  ROLE_ADMIN,
  ROLE_SURVEYOR,
  useLocallyStoredJWT,
} from "./features/login/loginUtils";

import AdminContainer from "./pages/Admin/AdminContainer";
import Box from "@mui/material/Box";
import Login from "./features/login/Login";
import { ProtectedRoute } from "./routing/ProtectedRoute";
import PublicContainer from "./pages/Public/PublicContainer";
import SurveyorContainer from "./pages/Surveyor/SurveyorContainer";

const ONELINK_LANGUAGE_BAR_HEIGHT = "36px";

function App() {
  // update jwt
  useLocallyStoredJWT();

  return (
    <Box sx={{ paddingBottom: ONELINK_LANGUAGE_BAR_HEIGHT }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to={routes.PUBLIC_ROUTE} />} />

          <Route
            path={`${routes.SURVEYOR_ROUTE}/*`}
            element={
              <ProtectedRoute allowedRoles={[ROLE_SURVEYOR, ROLE_ADMIN]}>
                <SurveyorContainer />
              </ProtectedRoute>
            }
          />

          <Route
            path={`${routes.PUBLIC_ROUTE}/*`}
            element={<PublicContainer />}
          />

          <Route
            path={`${routes.ADMIN_ROUTE}/*`}
            element={
              <ProtectedRoute allowedRoles={[ROLE_ADMIN]}>
                <AdminContainer />
              </ProtectedRoute>
            }
          />
          <Route path={`${routes.LOGIN_ROUTE}`} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
