import type { PropsWithChildren } from "react";
import type { Store } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import type React from "react";
import type { BookState } from "../book/slice/bookSlice";
import type { ModalState } from "../types";
import store from "../store/store";

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
