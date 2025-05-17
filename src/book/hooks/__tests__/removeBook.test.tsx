import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react";
import setupStore from "../../../store/setupStore";
import type { ModalState } from "../../../types";
import { narutoBook } from "../../fixtures/fixtures";
import type { BookState } from "../../slice/bookSlice";
import useBooks from "../useBooks";

describe("Given the removeBook function", () => {
  describe("When it's called with Naruto Vol. 1 book id", () => {
    test("Then it should remove the book Naruto Vol. 1 from booksInfo", async () => {
      const initialState: { books: BookState; modal: ModalState } = {
        books: {
          booksInfo: {
            books: [narutoBook],
            totals: {
              books: 1,
              booksRead: 1,
              booksToRead: 0,
            },
          },
          isLoading: "false",
        },
        modal: {
          isError: false,
          isModalActive: false,
          modalText: "",
        },
      };

      const testStore = setupStore(initialState);

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={testStore}>{children}</Provider>
      );

      const { result } = renderHook(() => useBooks(), { wrapper });

      await act(() => {
        result.current.removeBook(narutoBook.id);
      });

      const books = result.current.books.books;
      const totals = result.current.books.totals;

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
