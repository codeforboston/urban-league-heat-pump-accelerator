import { createSlice } from "@reduxjs/toolkit";

export const locationPermissionSlice = createSlice({
  name: "locationPermission",
  initialState: {
    pageFirstLoad: true,
  },
  reducers: {
    updatePageFirstLoad: (state, action) => {
      state.pageFirstLoad = action.payload;
    },
  },
});
export const { updatePageFirstLoad } = locationPermissionSlice.actions;
export default locationPermissionSlice.reducer;
