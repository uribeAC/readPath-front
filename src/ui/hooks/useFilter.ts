import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setGenreFilterActionCreator,
  setStateFilterActionCreator,
} from "../slices/slices/filterSlice";

const useFilter = () => {
  const filter = useAppSelector((state) => state.filer);

  const dispatch = useAppDispatch();

  const setStateFilter = (state: string) => {
    const setState = setStateFilterActionCreator({ state });

    dispatch(setState);
  };

  const setGenreFilter = (genre: string) => {
    const setGenre = setGenreFilterActionCreator({ genre });

    dispatch(setGenre);
  };

  return {
    filter,
    setStateFilter,
    setGenreFilter,
  };
};

export default useFilter;
