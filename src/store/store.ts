import { configureStore } from "@reduxjs/toolkit";
import { booksReducer } from "../book/slice/bookSlice";

const store = configureStore({ reducer: { booksReducer: booksReducer } });

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
