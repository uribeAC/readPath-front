import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react";
import useBooks from "../useBooks";
import type { ModalState } from "../../../types";
import setupStore from "../../../store/setupStore";
import type { BookState } from "../../slice/bookSlice";
import { dragonBallToRead } from "../../fixtures/fixtures";
import { dragonBallModifiedDto } from "../../fixtures/fixturesDto";

describe("Given the editBook function", () => {
  describe("When it's called with Dragon Ball modified book and his id", () => {
    test("Then it should replace Dragon Ball book for the new modified book", async () => {
      const initialState: { books: BookState; modal: ModalState } = {
        books: {
          booksInfo: {
            books: [dragonBallToRead],
            totals: {
              books: 1,
              booksRead: 0,
              booksToRead: 1,
            },
          },
        },
        modal: {
          isError: false,
          isModalActive: false,
          modalText: "",
        },
      };

      const testStore = setupStore(initialState);

      const expectedDragonBallTitle = dragonBallModifiedDto.title;

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={testStore}>{children}</Provider>
      );

      const { result } = renderHook(() => useBooks(), { wrapper });

      await act(() => {
        result.current.editBook(
          dragonBallModifiedDto,
          dragonBallModifiedDto._id,
        );
      });

      const { books } = result.current.books;

      expect(books).toContainEqual(
        expect.objectContaining({
          title: expectedDragonBallTitle,
        }),
      );
    });
  });
});
