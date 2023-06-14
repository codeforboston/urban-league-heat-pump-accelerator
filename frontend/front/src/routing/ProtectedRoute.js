import * as routes from "./routes";

import { Navigate } from "react-router-dom";
import { useUserHasRoles } from "../features/login/loginUtils";

/*
 * Redirects user if they do not have the correct credentials
 */
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const userIsAllowed = useUserHasRoles(allowedRoles);
  if (!userIsAllowed) {
    // user is not authenticated
    return <Navigate to={routes.LOGIN_ROUTE} />;
  }
  return children;
};
