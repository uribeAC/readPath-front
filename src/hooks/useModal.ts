import { useCallback } from "react";
import {
  hideModalActionCreator,
  showModalActionCreator,
} from "../slices/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const useModal = () => {
  const modal = useAppSelector((state) => state.modal);

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
    modal,
    showModal,
    hideModal,
  };
};

export default useModal;
