import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/store";
import useBooks from "../useBooks";
import { mangaStats } from "../../fixtures/fixtures";
import { act } from "react";

describe("Given the loadStats function", () => {
  describe("When it's called", () => {
    test("Then it should set manga stats: total of 2 books read, 2 authors and 464 pages as BookStats", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      );

      const { result } = renderHook(() => useBooks(), { wrapper });

      await act(() => {
        result.current.loadStats();
      });

      const stats = result.current.stats;

      expect(stats).toStrictEqual(mangaStats);
    });
  });
});
