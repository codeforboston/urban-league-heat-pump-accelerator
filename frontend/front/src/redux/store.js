import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../features/home/homeSlice";
import aboutReducer from "../features/about/aboutSlice";
import contactReducer from "../features/contact/contactSlice"

export const store = configureStore({
  reducer: {
    home: homeReducer,
    about: aboutReducer,
    contact: contactReducer
  },
});
