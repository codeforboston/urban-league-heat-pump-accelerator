import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "URBAN LEAGUE HEAT PUMP",
};

const navSlice = createSlice({
  name: "nav",
  initialState: initialState,
});

export default navSlice.reducer;
