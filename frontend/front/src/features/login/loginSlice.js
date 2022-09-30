import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  password: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
    },
    setLogOut: (state) => {
      state.userName = null;
      state.password = null;
    },
  },
});

export const { setLogin, setLogOut } = loginSlice.actions;

export const selectuserName = (state) => state.login.userName;

export default loginSlice.reducer;
