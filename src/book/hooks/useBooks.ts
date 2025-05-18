import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addBookActionCreator,
  changeBookStateActionCreator,
  deleteBookActionCreator,
  loadBookByIdActionCreator,
  loadBooksActionCreator,
  startLoading,
  startSlowLoading,
} from "../slice/bookSlice";
import BookClient from "../client/bookClient";
import type { BookSendData } from "../types";

const useBooks = () => {
  const books = useAppSelector((state) => state.books.booksInfo);
  const isLoading = useAppSelector((state) => state.books.isLoading);

  const dispatch = useAppDispatch();

  const bookClient = useMemo(() => new BookClient(), []);

  const loadBooks = useCallback(
    async (pageNumber?: number): Promise<void> => {
      dispatch(startLoading());

      const timeout = setTimeout(() => {
        dispatch(startSlowLoading());
      }, 500);

      const booksInfo = await bookClient.getBooks(pageNumber);

      clearTimeout(timeout);
      const action = loadBooksActionCreator(booksInfo);

      dispatch(action);
    },
    [bookClient, dispatch],
  );

  const loadBookById = useCallback(
    async (bookId: string): Promise<void> => {
      dispatch(startLoading());

      const timeout = setTimeout(() => {
        dispatch(startSlowLoading());
      }, 500);

      const book = await bookClient.getBookById(bookId);

      clearTimeout(timeout);
      const action = loadBookByIdActionCreator({ book });

      dispatch(action);
    },
    [bookClient, dispatch],
  );

  const updateBook = async (
    actionState: "read" | "toread",
    bookId: string,
  ): Promise<void> => {
    const updatedBook = await bookClient.changeBookState(actionState, bookId);

    const actionInfo = {
      updatedBook,
      actionState,
    };

    const action = changeBookStateActionCreator(actionInfo);

    dispatch(action);
  };

  const createBook = async (bookData: BookSendData): Promise<void> => {
    const newBook = await bookClient.addBook(bookData);

    const action = addBookActionCreator({ newBook });

    dispatch(action);
  };

  const removeBook = async (bookId: string): Promise<void> => {
    const deletedBook = await bookClient.deleteBook(bookId);

    const action = deleteBookActionCreator({ deletedBook });

    dispatch(action);
  };

  return {
    books,
    loadBooks,
    loadBookById,
    updateBook,
    createBook,
    removeBook,
    isLoading,
  };
};

export default useBooks;
