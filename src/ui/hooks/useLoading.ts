import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
} from "../slices/slices/uiSlice";
import type { LoadingContext } from "./types";

const useLoading = (): LoadingContext => {
  const loadingState = useAppSelector((state) => state.ui);

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
    loadingState,
    startLoading,
    stopLoading,
  };
};

export default useLoading;
