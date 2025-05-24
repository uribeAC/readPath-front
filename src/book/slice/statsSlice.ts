import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookStats } from "../types";

const initialState: BookStats = {
  totals: {
    read: 0,
    pages: 0,
    authors: 0,
  },
  genres: {
    total: 0,
    genres: [],
  },
  booksYear: [],
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    loadStats: (
      _currentState,
      { payload }: PayloadAction<BookStats>,
    ): BookStats => {
      return payload;
    },
  },
});

export const statsReducer = statsSlice.reducer;

export const { loadStats: loadStatsActionCreator } = statsSlice.actions;
