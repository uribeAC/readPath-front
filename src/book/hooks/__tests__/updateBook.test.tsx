import { Provider } from "react-redux";
import React, { act } from "react";
import { renderHook } from "@testing-library/react";
import type { BookState } from "../../slice/bookSlice";
import setupStore from "../../../store/setupStore";
import useBooks from "../useBooks";
import { dragonBallRead, dragonBallToRead } from "../../fixtures/fixtures";

describe("Given the updateBook function", () => {
  describe("When it's called with Dragon Ball book id marked as 'to read' and an action state of 'read'", () => {
    test("Then it should update the book Dragon Ball marked as 'read' in booksInfo", async () => {
      const initialState: { books: BookState } = {
        books: {
          booksInfo: {
            books: [dragonBallToRead],
            totals: {
              books: 1,
              booksRead: 0,
              booksToRead: 1,
            },
          },
          isLoading: "false",
        },
      };

      const testStore = setupStore(initialState);

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={testStore}>{children}</Provider>
      );

      const { result } = renderHook(() => useBooks(), { wrapper });

      await act(() => {
        result.current.updateBook("read", dragonBallRead.id);
      });

      const books = result.current.books.books;
      const totals = result.current.books.totals;

      expect(books).toContainEqual(
        expect.objectContaining({
          title: dragonBallRead.title,
          state: "read",
        }),
      );

      expect(totals.booksRead).toBe(1);
      expect(totals.booksToRead).toBe(0);
    });
  });
});
