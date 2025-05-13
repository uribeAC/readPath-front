import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeBookStateActionCreator,
  loadBooksActionCreator,
} from "../slice/bookSlice";
import BookClient from "../client/bookClient";

const useBooks = () => {
  const books = useAppSelector((state) => state.books.booksInfo);

  const dispatch = useAppDispatch();

  const bookClient = useMemo(() => new BookClient(), []);

  const loadBooks = useCallback(
    async (pageNumber?: number): Promise<void> => {
      const booksInfo = await bookClient.getBooks(pageNumber);

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
  };
};

export default useBooks;
