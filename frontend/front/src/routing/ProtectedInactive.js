import { Navigate, Outlet } from "react-router-dom";
import * as routes from "./routes";

/*
 * Redirects user if they do not have the correct credentials
 */
export const ProtectedInactive = ({ children, userStatus }) => {
  if (userStatus === "inactive") {
    return <Navigate to={routes.SURVEYOR_INACTIVE} />;
  }
  return <Outlet />;
};
