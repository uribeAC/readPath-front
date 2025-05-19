import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
} from "../slices/slices/loadingSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const useLoading = () => {
  const loading = useAppSelector((state) => state.loading);

  const dispatch = useAppDispatch();

  const startLoading = () => {
    const startLoading = startLoadingActionCreator();

    dispatch(startLoading);
  };

  const stopLoading = () => {
    const stopLoading = stopLoadingActionCreator();

    dispatch(stopLoading);
  };

  return {
    loading,
    startLoading,
    stopLoading,
  };
};

export default useLoading;
