import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react";
import useFilter from "../useFilter";
import store from "../../../store/store";

describe("Given the setGenreFilter function", () => {
  describe("When it's called with the genre 'Fantasy'", () => {
    test("Then it should set Filter genre as 'Fantasy'", async () => {
      const expectedGenre = "Fantasy";

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      );

      const { result } = renderHook(() => useFilter(), { wrapper });

      await act(() => {
        result.current.setGenreFilter(expectedGenre);
      });

      const genre = result.current.filter.genre;

      expect(genre).toBe(expectedGenre);
    });
  });
});
