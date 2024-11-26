import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// the inital state for theme is dark
const initialState = {
  menu: false,
};

// creating the theme slice
export const setSettings = createSlice({
  name: "settings",
  initialState: initialState, // seting the initial state
  reducers: {
    updateMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { updateMenu } = setSettings.actions;
export default setSettings.reducer; // exporting our reducer that will be passed to the store.ts file
