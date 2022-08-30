import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../features/home/homeSlice";
import aboutReducer from "../features/about/aboutSlice";
import contactReducer from "../features/contact/contactSlice"
import navReducer from "../features/nav/navSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    about: aboutReducer,
    contact: contactReducer,
    nav: navReducer,
  },
});
