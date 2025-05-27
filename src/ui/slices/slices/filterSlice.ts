import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FilterState = {
  state: string;
  genre: string;
};

const initialState: FilterState = {
  state: "All",
  genre: "All",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStateFilter: (
      currentState,
      { payload: { state } }: PayloadAction<{ state: string }>,
    ): FilterState => {
      return {
        state,
        genre: currentState.genre,
      };
    },
    setGenreFilter: (
      currentState,
      { payload: { genre } }: PayloadAction<{ genre: string }>,
    ): FilterState => {
      return {
        state: currentState.state,
        genre,
      };
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const {
  setStateFilter: setStateFilterActionCreator,
  setGenreFilter: setGenreFilterActionCreator,
} = filterSlice.actions;
