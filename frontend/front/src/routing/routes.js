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

export const ADMIN_DASHBOARD_ROUTE = `${ADMIN_ROUTE}/dashboard`;
