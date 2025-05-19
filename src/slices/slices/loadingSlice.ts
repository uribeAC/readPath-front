import { createSlice } from "@reduxjs/toolkit";

type LoadingState = {
  isLoading: boolean;
};

const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (): LoadingState => {
      return {
        isLoading: true,
      };
    },
    stopLoading: (): LoadingState => {
      return {
        isLoading: false,
      };
    },
  },
});

export const loadingReducer = loadingSlice.reducer;

export const {
  startLoading: startLoadingActionCreator,
  stopLoading: stopLoadingActionCreator,
} = loadingSlice.actions;
