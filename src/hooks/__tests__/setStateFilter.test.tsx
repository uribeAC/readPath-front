import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react";
import useFilter from "../useFilter";
import store from "../../store/store";

describe("Given the setStateFilter function", () => {
  describe("When it's called with the state 'read'", () => {
    test("Then it should set Filter state as 'read'", async () => {
      const expectedState = "read";

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      );

      const { result } = renderHook(() => useFilter(), { wrapper });

      await act(() => {
        result.current.setStateFilter(expectedState);
      });

      const state = result.current.filter.state;

      expect(state).toBe(expectedState);
    });
  });
});
