import { renderHook } from "@testing-library/react";
import useBooks from "../useBooks";
import { act } from "react";
import { Provider } from "react-redux";
import store from "../../../store/store";

describe("Given the loadBooks function", () => {
  describe("When it's called with page number 2", () => {
    test("Then it should set the book Vinland Saga Vol. 1 and Demon Slayer: Kimetsu no Yaiba Vol. 1 as booksInfo with a total of 12", async () => {
      const expectedKimetsuTitle = "Demon Slayer: Kimetsu no Yaiba Vol. 1";
      const expectedVinlandTitle = "Vinland Saga Vol. 1";
      const expectedBooksTotal = 12;

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      );

      const { result } = renderHook(() => useBooks(), { wrapper });

      await act(() => {
        result.current.loadBooks(2, "", "");
      });

      const books = result.current.books.books;
      const totals = result.current.books.totals;

      expect(books).toContainEqual(
        expect.objectContaining({
          title: expectedKimetsuTitle,
        }),
      );
      expect(books).toContainEqual(
        expect.objectContaining({
          title: expectedVinlandTitle,
        }),
      );

      expect(totals.books).toBe(expectedBooksTotal);
    });
  });
});
