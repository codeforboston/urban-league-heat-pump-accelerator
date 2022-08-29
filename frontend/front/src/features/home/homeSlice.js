import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageArray: [],
  title: "Home page",
  isLoading: true,
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
});

export default homeSlice.reducer;
