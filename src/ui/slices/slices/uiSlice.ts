import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ModalActiveState, UiState } from "../types";

const initialState: UiState = {
  modal: {
    isModalActive: false,
    isError: false,
    modalText: "",
  },
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    startLoading: (currentState): UiState => {
      return {
        ...currentState,
        isLoading: true,
      };
    },
    stopLoading: (currentState): UiState => {
      return {
        ...currentState,
        isLoading: false,
      };
    },
    showModal: (
      currentState,
      { payload: { modalText, isError } }: PayloadAction<ModalActiveState>,
    ): UiState => {
      return {
        ...currentState,
        modal: { isModalActive: true, isError, modalText },
      };
    },
    hideModal: (currentState): UiState => {
      return {
        ...currentState,
        modal: { isModalActive: false, modalText: "", isError: false },
      };
    },
  },
});

export const uiReducer = uiSlice.reducer;

export const {
  startLoading: startLoadingActionCreator,
  stopLoading: stopLoadingActionCreator,
  showModal: showModalActionCreator,
  hideModal: hideModalActionCreator,
} = uiSlice.actions;
