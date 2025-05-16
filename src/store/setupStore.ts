import { configureStore } from "@reduxjs/toolkit";
import { booksReducer, type BookState } from "../book/slice/bookSlice";
import type { ModalState } from "../types";
import { modalReducer } from "../slice/modalSlice";

type RootPreloadedState = {
  books: BookState;
  modal: ModalState;
};

const setupStore = (preloadedState?: RootPreloadedState) => {
  const store = configureStore({
    reducer: { books: booksReducer, modal: modalReducer },
    preloadedState,
  });

  return store;
};

export default setupStore;
