import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react";
import store from "../../../store/store";
import useModal from "../useModal";

describe("Given the hideModal function", () => {
  describe("When it's called", () => {
    test("Then it should hide the modal and don't have any modal message", async () => {
      const expectedMessage = "";

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      );

      const { result } = renderHook(() => useModal(), { wrapper });

      await act(() => {
        result.current.hideModal();
      });

      const modalText = result.current.modalState.modal.modalText;
      const isModalActive = result.current.modalState.modal.isModalActive;

      expect(modalText).toBe(expectedMessage);
      expect(isModalActive).toBe(false);
    });
  });
});
