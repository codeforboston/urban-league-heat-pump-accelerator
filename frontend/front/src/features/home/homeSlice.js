import { createSlice } from "@reduxjs/toolkit";
import { fetchGetData } from "../../api/api";
import DataHome from "./../../dummyData/dataHome.json";

const initialState = {
  pageArray: [],
  title: "Home page",
  isLoading: true,
  activeHome: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    fetchHomeData: (state) => {
      // Accessing mocked server
      const url = "http://localhost:8080/home";
      let data2;
      const fetchData = async () => {
        fetchGetData(url, data2);
      };

      console.log(data2);
      // importing directly from files
      state.title = DataHome.title;
      state.array = DataHome.array;
    },
    setActiveHome: (state, action) => {
      state.activeHome = action.payload;
    },
  },
});

export const { fetchHomeData, setActiveHome } = homeSlice.actions;

export default homeSlice.reducer;
