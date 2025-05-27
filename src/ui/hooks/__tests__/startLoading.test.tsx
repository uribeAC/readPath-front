import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react";
import store from "../../../store/store";
import useLoading from "../useLoading";

describe("Given the startLoading function", () => {
  describe("When it's called", () => {
    test("Then it should set isLoading as true", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      );

      const { result } = renderHook(() => useLoading(), { wrapper });

      await act(() => {
        result.current.startLoading();
      });

      const isLoading = result.current.loadingState.isLoading;

      expect(isLoading).toBe(true);
    });
  });
});
