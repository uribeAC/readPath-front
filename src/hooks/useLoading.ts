import { useCallback } from "react";
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
} from "../slices/slices/loadingSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const useLoading = () => {
  const loading = useAppSelector((state) => state.loading);

  const dispatch = useAppDispatch();

  const startLoading = useCallback(() => {
    const startLoading = startLoadingActionCreator();

    dispatch(startLoading);
  }, [dispatch]);

  const stopLoading = useCallback(() => {
    const stopLoading = stopLoadingActionCreator();

    dispatch(stopLoading);
  }, [dispatch]);

  return {
    loading,
    startLoading,
    stopLoading,
  };
};

export default useLoading;
