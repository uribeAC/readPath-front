import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BooksInfo } from "../client/types";
import type { Book } from "../types";

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
    changeBookState: (
      { booksInfo: { books, totals } },
      {
        payload: { updatedBook, actionState },
      }: PayloadAction<{ updatedBook: Book; actionState: string }>,
    ): BookState => {
      return {
        booksInfo: {
          books: books.map((book) => {
            const actionUpdatedBook =
              book.id === updatedBook.id ? updatedBook : book;

            return actionUpdatedBook;
          }),
          totals: {
            books: totals.books,
            booksRead:
              actionState === "read"
                ? totals.booksRead + 1
                : totals.booksRead - 1,
            booksToRead:
              actionState === "toread"
                ? totals.booksToRead + 1
                : totals.booksToRead - 1,
          },
        },
      };
    },
  },
});

export const booksReducer = bookSlice.reducer;

export const {
  loadBooks: loadBooksActionCreator,
  changeBookState: changeBookStateActionCreator,
} = bookSlice.actions;
