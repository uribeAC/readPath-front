import { useCallback } from "react";
import { useSearchParams } from "react-router";
import type { SearchParams } from "../types";

const useSearch = () => {
  const [searchParams] = useSearchParams();

  const getSearchParams = useCallback((): SearchParams => {
    const searchPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const searchState = searchParams.get("state")
      ? searchParams.get("state")!
      : "";
    const searchGenre = searchParams.get("genre")
      ? searchParams.get("genre")!
      : "";

    return {
      page: searchPage,
      state: searchState,
      genre: searchGenre,
    };
  }, [searchParams]);

  const getUrl = (page: number): string => {
    const newUrl = new URL(`${origin}/books?page=${page}`);

    const { state, genre } = getSearchParams();

    if (state !== "") {
      newUrl.searchParams.set("state", state);
    }

    if (genre !== "") {
      newUrl.searchParams.set("genre", genre);
    }

    return newUrl.toString();
  };

  return { getSearchParams, getUrl };
};

export default useSearch;
