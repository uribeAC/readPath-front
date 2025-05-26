import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import store from "../../../store/store";
import { act } from "react";
import useBooks from "../useBooks";
import { mangaStats } from "../../fixtures/fixtures";

describe("Given the loadStats function", () => {
  describe("When it's called", () => {
    test("Then it should set manga stats: total of 2 books read, 2 authors and 464 pages as BookStats", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
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
