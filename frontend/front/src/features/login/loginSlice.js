import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  AUTHORIZATION_HEADER,
  AUTH_TOKEN_LOCAL_STORAGE_KEY,
  decodeJwt,
} from "./loginUtils";

import { apiSlice } from "../../api/apiSlice";

const loginSlice = createSlice({
  name: "login",
  initialState: { user: null, token: null },
  reducers: {
    setLoginInfo: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    // update state whenever user logs in successfully
    builder.addMatcher(
      apiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload, meta }) => {
        const token =
          meta.baseQueryMeta.response.headers.get(AUTHORIZATION_HEADER);
        state.token = token;
        state.user = decodeJwt(token);

        localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, token);
      }
    );
    // update state whenever user logs out successfully
    builder.addMatcher(apiSlice.endpoints.logoutUser.matchPending, (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
    });
  },
});

export const { setLoginInfo } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;

export const selectCurrentUser = (state) => state.login.user;
export const selectIsLoggedIn = createSelector(
  [selectCurrentUser],
  (user) => !!user
);
export const selectCurrentUserEmail = createSelector(
  [selectCurrentUser],
  (user) => user?.email || null
);
