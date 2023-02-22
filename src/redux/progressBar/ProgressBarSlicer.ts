import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { RootState } from "../store";

export interface Themes {
  isAnimating: boolean;
}

const initialState: Themes = {
  isAnimating: false,
};

const progressBarSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setIsAnimating(state, actions) {
      const value = actions.payload;
      state.isAnimating = value;
    },
  },
});

export const { setIsAnimating } = progressBarSlice.actions;
export const currentProgress = (state: RootState) => state.progress.isAnimating;
export default progressBarSlice;
