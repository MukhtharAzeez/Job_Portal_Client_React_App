import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { RootState } from "../store";

export interface Themes {
  mode: String;
}

const initialState: Themes = {
  mode: "light",
};

const userSideThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, actions) {
      const currentTheme = actions.payload;
      if (currentTheme == "dark") {
        state.mode = "light";
      } else {
        state.mode = "dark";
      }
    },
  },
});

export const { changeTheme } = userSideThemeSlice.actions;
export const currentTheme = (state: RootState) => state.userTheme.mode;
export default userSideThemeSlice;
