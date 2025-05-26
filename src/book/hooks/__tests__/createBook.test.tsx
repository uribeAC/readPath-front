import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { act } from "react";
import { dragonBallData } from "../../fixtures/fixtures";
import store from "../../../store/store";
import useBooks from "../useBooks";

describe("Given the createBook function", () => {
  describe("When it's called with Dragon Ball book", () => {
    test("Then it should add Dragon Ball book to booksInfo", async () => {
      const expectedDragonBallTitle = dragonBallData.title;
      const expectedBooksTotal = 1;

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useBooks(), { wrapper });

      await act(() => {
        result.current.createBook(dragonBallData);
      });

      const { books, totals } = result.current.books;

      expect(books).toContainEqual(
        expect.objectContaining({
          title: expectedDragonBallTitle,
        }),
      );

      expect(totals.books).toBe(expectedBooksTotal);
    });
  });
});
