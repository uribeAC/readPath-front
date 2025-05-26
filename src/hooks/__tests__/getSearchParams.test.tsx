import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "../../store/store";
import useSearch from "../useSearch";

describe("Given the getSearchParams function", () => {
  describe("When it's called in the path /books?state=read", () => {
    test("Then it should return 'state' as 'read'", () => {
      const expectedState = "read";

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter initialEntries={["/books?state=read"]}>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useSearch(), { wrapper });

      const searchParams = result.current.getSearchParams();

      expect(searchParams.state).toBe(expectedState);
    });
  });
});
