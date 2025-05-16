import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

const user = userEvent.setup();

beforeEach(() => {
  vitest.clearAllMocks();
});

describe("Given the Modal component", () => {
  describe("When it receives 'Manga added' and an action", () => {
    const action = vitest.fn();
    const modalText = "Manga added";

    test("Then it show 'Manga added'", () => {
      render(<Modal action={action} isError={false} text={modalText} />);

      const modal = screen.getByText(modalText);

      expect(modal).toBeInTheDocument();
    });

    test("Then it should show an image of 'close modal' inside a button", () => {
      const iconAlt = /close modal/i;

      render(<Modal action={action} isError={false} text={modalText} />);

      const modalButton = screen.getByRole("button", { name: iconAlt });

      expect(modalButton).toBeInTheDocument();
    });

    describe("And the user clicks the 'close button'", () => {
      test("Then it should call the received action", async () => {
        const iconAlt = /close modal/i;

        render(<Modal action={action} isError={false} text={modalText} />);

        const modalButton = screen.getByRole("button", { name: iconAlt });

        await user.click(modalButton);

        expect(action).toHaveBeenCalled();
      });
    });
  });
});
