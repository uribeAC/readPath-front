import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "../../store/store";
import useSearch from "../useSearch";

describe("Given the getUrl function", () => {
  describe("When it's called in the path /books?state=read with second page", () => {
    test("Then it should return '/books?page=2&state=read'", () => {
      const pageNumber = 2;
      const origin = window.origin;
      const expectedUrl = `${origin}/books?page=2&state=read`;

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter initialEntries={["/books?state=read"]}>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useSearch(), { wrapper });

      const url = result.current.getUrl(pageNumber);

      expect(url).toBe(expectedUrl);
    });
  });
});
