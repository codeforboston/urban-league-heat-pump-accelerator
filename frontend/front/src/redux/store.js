import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import accountReducer from "../features/account/accountSlice";
import { breadcrumbsReducer } from "../features/breadcrumb/breadcrumbSlice";
import { loginReducer } from "../features/login/loginSlice";
import navReducer from "../features/nav/navSlice";
import surveyorReducer from "../features/surveyor/surveyorSlice";
import locationPermissionReducer from "../pages/Surveyor/dashboard/locationPermissionSlice";

export const createStore = (options) =>
  configureStore({
    reducer: {
      account: accountReducer,
      nav: navReducer,
      breadcrumbs: breadcrumbsReducer,
      login: loginReducer,
      surveyor: surveyorReducer,
      locationPermissionPage: locationPermissionReducer,
      // apis
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // disable dev extension in production
    devTools: process.env.NODE_ENV !== "production",
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    ...options,
  });

// Assign the Redux store to a global property 'window.store'
window.store = createStore();

export const store = createStore();
