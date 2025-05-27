export interface ModalActiveState {
  isError: boolean;
  modalText: string;
}

export interface UiState {
  modal: {
    isModalActive: boolean;
    isError: boolean;
    modalText: string;
  };
  isLoading: boolean;
}
