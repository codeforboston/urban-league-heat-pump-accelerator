import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "John",
  lastName: "Smith",
  email: "jsmith@example.com",
  address: "12345 John Smith Way",
  phoneNumber: "1234567890",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.phoneNumber = action.payload.phoneNumber;
    },
    setLogOut: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.address = null;
      state.phoneNumber = null;
    },
  },
});

export const { setAccount, setLogOut } = accountSlice.actions;

export default accountSlice.reducer;
