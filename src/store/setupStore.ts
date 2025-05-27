import { configureStore } from "@reduxjs/toolkit";
import { booksReducer, type BookState } from "../book/slice/bookSlice";
import { filterReducer } from "../ui/slices/slices/filterSlice";
import { statsReducer } from "../book/slice/statsSlice";
import { uiReducer } from "../ui/slices/slices/uiSlice";

type RootPreloadedState = {
  books: BookState;
};

const setupStore = (preloadedState?: RootPreloadedState) => {
  const store = configureStore({
    reducer: {
      books: booksReducer,
      stats: statsReducer,
      ui: uiReducer,
      filer: filterReducer,
    },
    preloadedState,
  });

  return store;
};

export default setupStore;
