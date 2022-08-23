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

console.log(homeSlice);

export default homeSlice.reducer;
