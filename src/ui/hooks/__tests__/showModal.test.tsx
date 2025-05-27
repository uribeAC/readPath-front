import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react";
import store from "../../../store/store";
import useModal from "../useModal";

describe("Given the showModal function", () => {
  describe("When it's called with 'READ MORE' message", () => {
    test("Then it should activate the modal and set 'READMORE' as the modal message", async () => {
      const expectedMessage = "READMORE";

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      );

      const { result } = renderHook(() => useModal(), { wrapper });

      await act(() => {
        result.current.showModal(expectedMessage, false);
      });

      const modalText = result.current.modal.modal.modalText;
      const isModalActive = result.current.modal.modal.isModalActive;

      expect(modalText).toBe(expectedMessage);
      expect(isModalActive).toBe(true);
    });
  });
});
