import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/store";
import useBooks from "../useBooks";
import { mangaStats } from "../../fixtures/fixtures";

describe("Given the loadStats function", () => {
  describe("When it's called", () => {
    test("Then it should return manga bookshelf stats, as a total of 2 books read, 2 authors and 464 pages", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      );

      const { result } = renderHook(() => useBooks(), { wrapper });

      const stats = await result.current.loadStats();

      expect(stats).toStrictEqual(mangaStats);
    });
  });
});
