import {
  hideModalActionCreator,
  showModalActionCreator,
} from "../slice/modalSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const useModal = () => {
  const modal = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const showModal = (modalText: string, isError: boolean) => {
    const showModal = showModalActionCreator({
      modalText,
      isError,
    });

    dispatch(showModal);
  };

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
