import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageArray: [],
  title: "Contact",
  Ulem: {
    name: "Urban League Eastern Massachusettes",
    phone: "(617) 442-4519",
    email: "info@ulem.org",
    website: "https://www.ulem.org/",
    address: "88 Warren Street, Roxbury, MA 02119",
  },
  Cfb: {
    name: "Code for Boston",
    phone: "N/A",
    email: "hello@codeforboston.org",
    website: "https://www.codeforboston.org/",
    address: "1 Broadway, Cambridge, MA 02142",
  },
  isLoading: true,
};

const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
});

export default contactSlice.reducer;
