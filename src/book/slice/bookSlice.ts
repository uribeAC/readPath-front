import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BooksInfo } from "../client/types";
import type { Book } from "../types";

export type BookState = {
  booksInfo: BooksInfo;
  isLoading: "true" | "true-slow" | "false";
};

const initialState: BookState = {
  booksInfo: {
    books: [],
    totals: {
      books: 0,
      booksRead: 0,
      booksToRead: 0,
    },
  },
  isLoading: "false",
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    startLoading: (currentState): BookState => {
      return {
        ...currentState,
        isLoading: "true",
      };
    },
    startSlowLoading: (currentState): void => {
      currentState.isLoading = "true-slow";
    },
    loadBooks: (
      currentState,
      { payload: { books, totals } }: PayloadAction<BooksInfo>,
    ): BookState => {
      return {
        ...currentState,
        booksInfo: {
          books: [...books],
          totals,
        },
        isLoading: "false",
      };
    },
    loadBookById: (
      currentState,
      { payload: { book } }: PayloadAction<{ book: Book }>,
    ): BookState => {
      return {
        ...currentState,
        booksInfo: {
          books: [book],
          totals: currentState.booksInfo.totals,
        },
        isLoading: "false",
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
        isLoading: "false",
      };
    },
    addBook: (
      {
        booksInfo: {
          books,
          totals: { books: booksTotal, booksRead, booksToRead },
        },
      },
      { payload: { newBook } }: PayloadAction<{ newBook: Book }>,
    ): BookState => {
      const state = newBook.state;

      return {
        booksInfo: {
          books: [...books, newBook],
          totals: {
            books: booksTotal + 1,
            booksRead: state === "read" ? booksRead + 1 : booksRead - 1,
            booksToRead:
              state === "to read" ? booksToRead + 1 : booksToRead - 1,
          },
        },
        isLoading: "false",
      };
    },
    deleteBook: (
      {
        booksInfo: {
          books,
          totals: { books: booksTotal, booksRead, booksToRead },
        },
      },
      {
        payload: {
          deletedBook: { id, state },
        },
      }: PayloadAction<{ deletedBook: Book }>,
    ): BookState => {
      return {
        booksInfo: {
          books: books.filter((book) => book.id !== id),
          totals: {
            books: booksTotal - 1,
            booksRead: state === "read" ? booksRead - 1 : booksRead,
            booksToRead: state === "to read" ? booksToRead - 1 : booksToRead,
          },
        },
        isLoading: "false",
      };
    },
  },
});

export const booksReducer = bookSlice.reducer;

export const {
  loadBooks: loadBooksActionCreator,
  loadBookById: loadBookByIdActionCreator,
  changeBookState: changeBookStateActionCreator,
  addBook: addBookActionCreator,
  deleteBook: deleteBookActionCreator,
  startLoading,
  startSlowLoading,
} = bookSlice.actions;
