import type { Store } from "@reduxjs/toolkit";
import type { BookState } from "../book/slice/bookSlice";
import type { ModalState } from "../types";
import type React from "react";
import type { PropsWithChildren } from "react";
import store from "../store/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

interface ContextProviderStructure {
  initialEntries?: string[];
  preloadedStore?: Store<{
    books: BookState;
    modal: ModalState;
  }>;
}

const ContextProvider: React.FC<
  PropsWithChildren<ContextProviderStructure>
> = ({ initialEntries, preloadedStore, children }) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <Provider store={preloadedStore ?? store}>{children}</Provider>
    </MemoryRouter>
  );
};

export default ContextProvider;
