import accountReducer from "../features/account/accountSlice";
import { apiSlice } from "../api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../features/contact/contactSlice";
import { loginReducer } from "../features/login/loginSlice";
import navReducer from "../features/nav/navSlice";
import surveyorReducer from "../features/surveyor/surveyorSlice";
import { breadcrumbsReducer } from "../features/breadcrumb/breadcrumbSlice";

export const createStore = (options) =>
  configureStore({
    reducer: {
      account: accountReducer,
      contact: contactReducer,
      nav: navReducer,
      breadcrumbs: breadcrumbsReducer,
      login: loginReducer,
      surveyor: surveyorReducer,
      // apis
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    ...options,
  });

// Assign the Redux store to a global property 'window.store'
window.store = createStore();

export const store = createStore();
