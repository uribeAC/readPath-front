import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeBookStateActionCreator,
  loadBooksActionCreator,
  startLoading,
  startSlowLoading,
} from "../slice/bookSlice";
import BookClient from "../client/bookClient";

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

  return {
    books,
    loadBooks,
    updateBook,
    isLoading,
  };
};

export default useBooks;
