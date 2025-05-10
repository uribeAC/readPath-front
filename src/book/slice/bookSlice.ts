import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BooksInfo } from "../client/types";

export type BookState = { booksInfo: BooksInfo };

const initialState: BookState = {
  booksInfo: {
    books: [],
    totals: {
      books: 0,
      booksRead: 0,
      booksToRead: 0,
    },
  },
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    loadBooks: (currentState, action: PayloadAction<BooksInfo>): BookState => {
      return {
        ...currentState,
        booksInfo: action.payload,
      };
    },
  },
});

export const booksReducer = bookSlice.reducer;

export const { loadBooks: loadBooksActionCreator } = bookSlice.actions;
