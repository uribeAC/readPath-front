import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react";
import useBooks from "../useBooks";
import store from "../../../store/store";
import { narutoVol1 } from "../../fixtures/fixturesDto";
import { MemoryRouter } from "react-router";

describe("Given the loadBookById function", () => {
  describe("When it's called with Naruto Vol. 1 id", () => {
    test("Then it should set the Naruto Vol. 1 as booksInfo", async () => {
      const expectedNarutoTitle = narutoVol1.title;

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useBooks(), { wrapper });

      await act(() => {
        result.current.loadBookById(narutoVol1._id);
      });

      const books = result.current.books.books;

      expect(books).toContainEqual(
        expect.objectContaining({
          title: expectedNarutoTitle,
        }),
      );
    });
  });
});
