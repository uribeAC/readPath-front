import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react";
import { server } from "../../mocks/node";
import { http, HttpResponse } from "msw";
import setupStore from "../../../store/setupStore";
import { narutoBook } from "../../fixtures/fixtures";
import type { BooksInfoDto } from "../../client/types";
import type { BookState } from "../../slice/bookSlice";
import useBooks from "../useBooks";
import { MemoryRouter } from "react-router";

describe("Given the removeBook function", () => {
  describe("When it's called with Naruto Vol. 1 book id", () => {
    test("Then it should remove the book Naruto Vol. 1 from booksInfo", async () => {
      const apiUrl = import.meta.env.VITE_API_URL;

      const initialState: { booksState: BookState } = {
        booksState: {
          booksInfo: {
            books: [narutoBook],
            totals: {
              books: 1,
              booksRead: 1,
              booksToRead: 0,
            },
          },
        },
      };

      const testStore = setupStore(initialState);

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={testStore}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useBooks(), { wrapper });

      server.use(
        http.get(`${apiUrl}/books`, () => {
          return HttpResponse.json<BooksInfoDto>({
            books: [],
            totals: {
              books: 0,
              booksRead: 0,
              booksToRead: 0,
            },
          });
        }),
      );

      await act(() => {
        result.current.removeBook(narutoBook.id);
      });

      const { books } = result.current.booksState;
      const { totals } = result.current.booksState;

      expect(books).not.toContainEqual(
        expect.objectContaining({
          title: narutoBook.title,
        }),
      );

      expect(totals.books).toBe(0);
      expect(totals.booksRead).toBe(0);
    });
  });
});
