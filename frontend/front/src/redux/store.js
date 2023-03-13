import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../features/home/homeSlice";
import aboutReducer from "../features/about/aboutSlice";
import accountReducer from "../features/account/accountSlice";
import contactReducer from "../features/contact/contactSlice";
import navReducer from "../features/nav/navSlice";
import loginReducer from "../features/login/loginSlice";
import surveyorReducer from "../features/surveyor/surveyorSlice";
// import { itemApi } from "./services";
import { apiSlice } from "./apiSlice";

export const createStore = (options) =>
  configureStore({
    reducer: {
      home: homeReducer,
      about: aboutReducer,
      account: accountReducer,
      contact: contactReducer,
      nav: navReducer,
      login: loginReducer,
      surveyor: surveyorReducer,
      // apis
      // [itemApi.reducerPath]: itemApi.reducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    ...options,
  });

export const store = createStore();
