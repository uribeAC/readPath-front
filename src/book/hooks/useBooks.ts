import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadBooksActionCreator } from "../slice/bookSlice";
import BookClient from "../client/bookClient";

const useBooks = () => {
  const books = useAppSelector((state) => state.booksReducer.booksInfo);

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

  return {
    books,
    loadBooks,
  };
};

export default useBooks;
