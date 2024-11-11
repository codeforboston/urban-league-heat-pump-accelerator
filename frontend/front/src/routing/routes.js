// TODO: what are best practices for not having react-router routes be magic values?

export const LOGIN_ROUTE = "/login";
export const SURVEYOR_ROUTE = "/surveyor";
export const PUBLIC_ROUTE = "/public";
export const DEV_ROUTE = "/dev";
export const ADMIN_ROUTE = "/admin";

export const SURVEYOR_DASHBOARD_ROUTE = `${SURVEYOR_ROUTE}/dashboard`;
export const SURVEYOR_ACCOUNT_ROUTE = `${SURVEYOR_ROUTE}/account`;
export const SURVEYOR_EDIT_ACCOUNT_ROUTE = `${SURVEYOR_ACCOUNT_ROUTE}/edit`;
export const SURVEYOR_HOUSE_ROUTE = `${SURVEYOR_ROUTE}/house`;
export const SURVEYOR_INACTIVE = `${SURVEYOR_ROUTE}/inactive`;

export const ADMIN_DASHBOARD_ROUTE = `${ADMIN_ROUTE}/`;
export const withAdminPrefix = (path) => `${ADMIN_ROUTE}/${path}`;

export const ADMIN_HOME = "home";
export const adminHomeProfile = (hid = ":hid") =>
  `${ADMIN_HOME}/homeprofile/${hid}`;

export const ADMIN_USER = "user";
export const adminUserProfile = (uid = ":uid") =>
  `${ADMIN_USER}/userprofile/${uid}`;
export const ADMIN_CREATE_USER = `${ADMIN_USER}/createUser`;

export const ADMIN_SURVEY = "survey";
export const adminSurveyEdit = (uid = ":uid") => `${ADMIN_SURVEY}/edit/${uid}`;
export const adminSurveyVisit = (uid = ":uid") =>
  `${ADMIN_SURVEY}/visit/${uid}`;

export const ADMIN_ASSIGNMENT = "assignment";
export const adminAssignmentProfile = (aid = ":aid") =>
  `${ADMIN_ASSIGNMENT}/assignProfile/${aid}`;
export const ADMIN_ASSIGNMENT_UNASSIGNED = `${ADMIN_ASSIGNMENT}/unassigned`;
