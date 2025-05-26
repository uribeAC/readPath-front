export interface ModalState {
  isModalActive: boolean;
  isError: boolean;
  modalText: string;
}

export interface SearchParams {
  page: number;
  state: string;
  genre: string;
}
