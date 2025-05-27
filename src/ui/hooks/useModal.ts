import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  hideModalActionCreator,
  showModalActionCreator,
} from "../slices/slices/uiSlice";
import type { ModalContext } from "./types";

const useModal = (): ModalContext => {
  const modalState = useAppSelector((state) => state.uiState);

  const dispatch = useAppDispatch();

  const showModal = useCallback(
    (modalText: string, isError: boolean) => {
      const showModal = showModalActionCreator({
        modalText,
        isError,
      });

      dispatch(showModal);
    },
    [dispatch],
  );

  const hideModal = () => {
    const hideModal = hideModalActionCreator();

    dispatch(hideModal);
  };

  return {
    modalState,
    showModal,
    hideModal,
  };
};

export default useModal;
