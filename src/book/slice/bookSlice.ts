import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BooksInfo } from "../client/types";
import type { Book } from "../types";

export type BookState = {
  booksInfo: BooksInfo;
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
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearBooks: (): BookState => {
      return {
        booksInfo: {
          books: [],
          totals: {
            books: 0,
            booksRead: 0,
            booksToRead: 0,
          },
        },
      };
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
      };
    },
    changeBookState: (
      { booksInfo: { books, totals } },
      {
        payload: { bookId, actionState },
      }: PayloadAction<{ bookId: string; actionState: string }>,
    ): BookState => {
      const newBooks = books.map<Book>((book) => {
        if (book.id === bookId) {
          const newState = actionState === "toread" ? "to read" : "read";

          return { ...book, state: newState };
        }

        return book;
      });

      return {
        booksInfo: {
          books: newBooks,
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
      };
    },
    modifyBook: (
      {
        booksInfo: {
          books,
          totals: { books: booksTotal, booksRead, booksToRead },
        },
      },
      {
        payload: { modifiedBook, bookId },
      }: PayloadAction<{ modifiedBook: Book; bookId: string }>,
    ) => {
      const previewBook = books.find((book) => book.id === bookId)!;

      const modifiedState = modifiedBook.state;
      const previewState = previewBook.state;

      const isStateModified = modifiedState !== previewState;
      const booksReadTotal =
        modifiedState === "read" ? booksRead + 1 : booksRead - 1;
      const booksToReadTotal =
        modifiedState === "to read" ? booksToRead + 1 : booksToRead - 1;

      return {
        booksInfo: {
          books: books.map((book) => {
            const actionModifiedBook = book.id === bookId ? modifiedBook : book;

            return actionModifiedBook;
          }),
          totals: {
            books: booksTotal + 1,
            booksRead: isStateModified ? booksReadTotal : booksRead,
            booksToRead: isStateModified ? booksToReadTotal : booksToRead,
          },
        },
      };
    },
  },
});

export const booksReducer = bookSlice.reducer;

export const {
  clearBooks: clearBooksActionCreator,
  loadBooks: loadBooksActionCreator,
  loadBookById: loadBookByIdActionCreator,
  changeBookState: changeBookStateActionCreator,
  addBook: addBookActionCreator,
  deleteBook: deleteBookActionCreator,
  modifyBook: modifyBookActionCreator,
} = bookSlice.actions;
