import { configureStore } from "@reduxjs/toolkit";
import { booksReducer, type BookState } from "../book/slice/bookSlice";
import type { ModalState } from "../types";
import { modalReducer } from "../slices/slices/modalSlice";
import { loadingReducer } from "../slices/slices/loadingSlice";
import { filterReducer } from "../slices/slices/filterSlice";
import { statsReducer } from "../book/slice/statsSlice";

type RootPreloadedState = {
  books: BookState;
  modal: ModalState;
};

const setupStore = (preloadedState?: RootPreloadedState) => {
  const store = configureStore({
    reducer: {
      books: booksReducer,
      stats: statsReducer,
      modal: modalReducer,
      loading: loadingReducer,
      filer: filterReducer,
    },
    preloadedState,
  });

  return store;
};

export default setupStore;
