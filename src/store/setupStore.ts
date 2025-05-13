import { configureStore } from "@reduxjs/toolkit";
import { booksReducer, type BookState } from "../book/slice/bookSlice";

type RootPreloadedState = {
  books: BookState;
};

const setupStore = (preloadedState?: RootPreloadedState) => {
  const store = configureStore({
    reducer: { books: booksReducer },
    preloadedState,
  });

  return store;
};

export default setupStore;
