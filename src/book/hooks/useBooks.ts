import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addBookActionCreator,
  changeBookStateActionCreator,
  deleteBookActionCreator,
  loadBookByIdActionCreator,
  loadBooksActionCreator,
} from "../slice/bookSlice";
import BookClient from "../client/bookClient";
import type { BookSendData } from "../types";
import useLoading from "../../hooks/useLoading";
import useModal from "../../hooks/useModal";

const useBooks = () => {
  const { startLoading, stopLoading } = useLoading();
  const { showModal } = useModal();
  const books = useAppSelector((state) => state.books.booksInfo);

  const dispatch = useAppDispatch();

  const bookClient = useMemo(() => new BookClient(), []);

  const loadBooks = useCallback(
    async (pageNumber?: number): Promise<void> => {
      const loadingDelay = setTimeout(() => {
        startLoading();
      }, 200);

      try {
        const booksInfo = await bookClient.getBooks(pageNumber);

        const action = loadBooksActionCreator(booksInfo);

        dispatch(action);
      } catch {
        showModal("Error fetching your bookshelf", true);
      } finally {
        clearTimeout(loadingDelay);
      }

      stopLoading();
    },
    [bookClient, dispatch, startLoading, stopLoading, showModal],
  );

  const loadBookById = useCallback(
    async (bookId: string): Promise<void> => {
      startLoading();

      const book = await bookClient.getBookById(bookId);

      const action = loadBookByIdActionCreator({ book });

      dispatch(action);
      stopLoading();
    },
    [bookClient, dispatch, startLoading, stopLoading],
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
  };
};

export default useBooks;
