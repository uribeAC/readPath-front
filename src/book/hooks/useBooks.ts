import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addBookActionCreator,
  changeBookStateActionCreator,
  clearBooksActionCreator,
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

  const clearBooks = useCallback(() => {
    const clearAction = clearBooksActionCreator();

    dispatch(clearAction);
  }, [dispatch]);

  const loadBooks = useCallback(
    async (pageNumber?: number): Promise<void> => {
      clearBooks();

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
    [bookClient, dispatch, startLoading, stopLoading, showModal, clearBooks],
  );

  const loadBookById = useCallback(
    async (bookId: string): Promise<void> => {
      clearBooks();

      const loadingDelay = setTimeout(() => {
        startLoading();
      }, 200);

      try {
        const book = await bookClient.getBookById(bookId);

        const action = loadBookByIdActionCreator({ book });

        dispatch(action);
      } catch {
        showModal("Error fetching the book", true);
      } finally {
        clearTimeout(loadingDelay);
      }

      stopLoading();
    },
    [bookClient, dispatch, startLoading, stopLoading, showModal, clearBooks],
  );

  const updateBook = async (
    actionState: "read" | "toread",
    bookId: string,
  ): Promise<void> => {
    try {
      const updatedBook = await bookClient.changeBookState(actionState, bookId);

      const actionInfo = {
        updatedBook,
        actionState,
      };

      const action = changeBookStateActionCreator(actionInfo);

      dispatch(action);
    } catch {
      showModal(`Error marking this book as ${actionState}`, true);
    }
  };

  const createBook = async (bookData: BookSendData): Promise<void> => {
    try {
      const newBook = await bookClient.addBook(bookData);

      showModal("Book added to bookshelf", false);

      const action = addBookActionCreator({ newBook });

      dispatch(action);
    } catch {
      showModal(`Error new book to your bookshelf`, true);
    }
  };

  const removeBook = async (bookId: string, page?: number): Promise<void> => {
    try {
      const deletedBook = await bookClient.deleteBook(bookId);

      showModal("Book deleted from bookshelf", false);

      const action = deleteBookActionCreator({ deletedBook });

      dispatch(action);
      loadBooks(page);
    } catch {
      showModal(`Error removing book from your bookshelf`, true);
    }
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
