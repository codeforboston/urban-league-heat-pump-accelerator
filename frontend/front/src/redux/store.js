import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../features/home/homeSlice";
import aboutReducer from "../features/about/aboutSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    about: aboutReducer,
  },
});
