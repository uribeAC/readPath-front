import { configureStore } from "@reduxjs/toolkit";
import { booksReducer, type BookState } from "../book/slice/bookSlice";
import { filterReducer } from "../ui/slices/slices/filterSlice";
import { statsReducer } from "../book/slice/statsSlice";
import { uiReducer } from "../ui/slices/slices/uiSlice";

type RootPreloadedState = {
  booksState: BookState;
};

const setupStore = (preloadedState?: RootPreloadedState) => {
  const store = configureStore({
    reducer: {
      booksState: booksReducer,
      statsState: statsReducer,
      uiState: uiReducer,
      filterState: filterReducer,
    },
    preloadedState,
  });

  return store;
};

export default setupStore;
