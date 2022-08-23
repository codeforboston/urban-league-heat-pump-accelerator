import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageArray: [],
  title: "About Page",
  isLoading: true,
};

const aboutSlice = createSlice({
  name: "about",
  initialState: initialState,
});

console.log(aboutSlice);

export default aboutSlice.reducer;
