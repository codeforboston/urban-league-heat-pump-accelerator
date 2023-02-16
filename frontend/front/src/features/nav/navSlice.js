import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "BOSTON HEAT PUMP ACCELERATOR",
};

const navSlice = createSlice({
  name: "nav",
  initialState: initialState,
});

export default navSlice.reducer;
