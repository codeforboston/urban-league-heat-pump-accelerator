import { selectCurrentUser, setLoginInfo } from "./loginSlice";
import { useDispatch, useSelector } from "react-redux";

import jwt_decode from "jwt-decode";
import { useGetSurveyorQuery } from "../../api/apiSlice";
import { useMemo } from "react";

export const AUTHORIZATION_HEADER = "Authorization";

// TODO: role names subject to change
export const ROLE_ADMIN = "admin";
export const ROLE_SURVEYOR = "surveyor";
export const ROLE_DATA_EDIT = "data_editor";
export const ROLE_DATA_VIEW = "date_viewer";

/*
 * Hook that returns true if the current user has one of the given roles attached to it
 */
export const useUserHasRoles = (allowedRoles) => {
  const currentUser = useSelector(selectCurrentUser);
  const { data: surveyorProfile } = useGetSurveyorQuery(currentUser?.id, {
    skip: !currentUser?.id,
  });

  return useMemo(
    () =>
      surveyorProfile?.role
        ? allowedRoles.includes(surveyorProfile.role)
        : false,
    [allowedRoles, surveyorProfile?.role]
  );
};

export const AUTH_TOKEN_LOCAL_STORAGE_KEY = "AUTH_TOKEN_LOCAL_STORAGE_KEY";

/*
 * Hook to get the JWT from local storage if it exists
 */
export const useLocallyStoredJWT = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
  if (!token) {
    return;
  }

  // "sub" = "subject", aka the user id
  const { sub } = jwt_decode(token);
  dispatch(setLoginInfo({ token, user: { id: sub } }));
};
