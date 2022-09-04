import { createSlice } from "@reduxjs/toolkit";
import DataAbout from "./../../dummyData/dataAbout.json";

const initialState = {
  objects: {},
  array: [],
  title: "About Page",
  isLoading: true,
  number: 10,
  totalNum: 0,
};

const aboutSlice = createSlice({
  name: "about",
  initialState: initialState,
  reducers: {
    clearNumber: (state) => {
      state.number = 0;
    },
    addNumber: (state) => {
      state.number += 1;
    },
    subNumber: (state) => {
      state.number -= 1;
    },
    fetchData: (state) => {
      state.objects = DataAbout;
      state.array = Object.values(state.objects);
    },
    clearData: (state) => {
      state.array = [];
    },
    restoreData: (state) => {
      state.array = Object.values(state.objects);
    },
    deleteDataByName: (state, action) => {
      const itemName = action.payload;
      state.array = state.array.filter((item) => item.name !== itemName);
    },
    increaseByName: (state, action) => {
      const itemFound = state.array.find(
        (item) => item.name === action.payload
      );
      itemFound.num += 1;
    },
    decreaseByName: (state, action) => {
      const itemFound = state.array.find(
        (item) => item.name === action.payload
      );
      itemFound.num -= 1;
    },
    calcTotal: (state) => {
      let total = 0;
      state.array.forEach((item) => {
        total += item.num;
      });
      state.totalNum = total;
    },
  },
});

console.log(aboutSlice);
export const {
  clearNumber,
  addNumber,
  subNumber,
  fetchData,
  clearData,
  restoreData,
  deleteDataByName,
  increaseByName,
  decreaseByName,
  calcTotal,
} = aboutSlice.actions;
export default aboutSlice.reducer;
