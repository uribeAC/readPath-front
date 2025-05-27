import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Given the Header component", () => {
  describe("When it renders", () => {
    test("Then it should show 'read Path' inside a level 1 heading", () => {
      const expectedTitle = /readPath/i;

      render(<Header />);

      const appTitle = screen.getByRole("heading", {
        name: expectedTitle,
        level: 1,
      });

      expect(appTitle).toBeInTheDocument();
    });
  });
});
