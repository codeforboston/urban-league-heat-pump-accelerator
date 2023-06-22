import { createSlice } from "@reduxjs/toolkit";

const breadcrumbSlice = createSlice({
  name: "breadcrumbs",
  initialState: {
    links: [],
  },
  reducers: {
    pushBreadcrumb: (state, action) => {
      if (
        action.payload.url &&
        state.links.at(-1)?.url !== action.payload?.url
      ) {
        state.links = [
          ...state.links,
          { url: action.payload.url, description: action.payload.description },
        ];
      }
    },
    setBreadcrumbs: (state, action) => {
      state.links = [...action.payload];
    },
  },
});

export const {
  pushBreadcrumb,
  setBreadcrumbs,
} = breadcrumbSlice.actions;
export const selectBreadcrumbs = (state) => state.breadcrumbs.links;

export const breadcrumbsReducer = breadcrumbSlice.reducer;
