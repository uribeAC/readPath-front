import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import BookClient from "../book/client/bookClient";
import { loadBooksActionCreator } from "../book/slice/bookSlice";

const useBooks = () => {
  const books = useAppSelector((state) => state.booksReducer.booksInfo);

  const dispatch = useAppDispatch();

  const bookClient = useMemo(() => new BookClient(), []);

  const loadBooks = useCallback(async () => {
    const books = await bookClient.getBooks(2);

    const action = loadBooksActionCreator(books);

    dispatch(action);
  }, [bookClient, dispatch]);

  return {
    books,
    loadBooks,
  };
};

export default useBooks;
