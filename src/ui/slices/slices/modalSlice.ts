/* import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ModalState } from "../../../types";
import type { ModalActiveState } from "../types";

const initialState: ModalState = {
  isModalActive: false,
  isError: false,
  modalText: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (
      _currentState,
      { payload: { modalText, isError } }: PayloadAction<ModalActiveState>,
    ): ModalState => {
      return {
        isModalActive: true,
        isError,
        modalText,
      };
    },
    hideModal: (currentState): ModalState => {
      return {
        ...currentState,
        isModalActive: false,
        modalText: "",
      };
    },
  },
});

export const modalReducer = modalSlice.reducer;

export const {
  showModal: showModalActionCreator,
  hideModal: hideModalActionCreator,
} = modalSlice.actions;
 */
