import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedHome: [],
};

const surveyorSlice = createSlice({
  name: "surveyor",
  initialState,
  reducers: {
    selectedHome: (state, action) => {
      // replace selectedhome with the array from payload
      state.selectedHome = action.payload;
    },
  },
});

export const { selectedHome } = surveyorSlice.actions;

// export const selectedHomeValue = (state) => state.surveyor.selectedHome;

export default surveyorSlice.reducer;
