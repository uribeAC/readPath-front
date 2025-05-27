import type { SearchParams } from "../../types";
import type { FilterState } from "../slices/slices/filterSlice";
import type { UiState } from "../slices/types";

export interface FilterContext {
  filter: FilterState;
  setStateFilter: (state: string) => void;
  setGenreFilter: (genre: string) => void;
}

export interface LoadingContext {
  loadingState: UiState;
  startLoading: () => void;
  stopLoading: () => void;
}

export interface ModalContext {
  modalState: UiState;
  showModal: (modalText: string, isError: boolean) => void;
  hideModal: () => void;
}

export interface SearchContext {
  getSearchParams: () => SearchParams;
  getUrl: (page: number) => string;
  getPath: (page: number) => string;
}
