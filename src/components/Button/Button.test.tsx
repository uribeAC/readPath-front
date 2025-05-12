import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

const user = userEvent.setup();

describe("Given the Button component", () => {
  const expectedButtonText = "Buy Manga";

  describe("When it receives 'Buy Manga' and an action", () => {
    test("Then it should show a 'Buy Manga' button", () => {
      render(
        <Button action={() => {}} isSelected={true}>
          {expectedButtonText}
        </Button>,
      );

      const buttonElement = screen.getByRole("button", {
        name: new RegExp(expectedButtonText, "i"),
      });

      expect(buttonElement).toBeVisible();
    });

    describe("And the user clicks the 'Buy Manga' button", () => {
      test("Then it should call the action", async () => {
        const action = vitest.fn();

        render(
          <Button action={action} isSelected={true}>
            {expectedButtonText}
          </Button>,
        );

        const buttonElement = screen.getByRole("button", {
          name: new RegExp(expectedButtonText, "i"),
        });

        await user.click(buttonElement);

        expect(action).toHaveBeenCalled();
      });
    });
  });
});
