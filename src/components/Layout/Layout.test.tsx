import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Given the Layout component", () => {
  describe("When it renders", () => {
    test("Then it should show read Path inside a level 1 heading", () => {
      const expectedTitle = /(?=.*^read)(?=.*path$)/i;

      render(<Layout />);

      const appTitle = screen.getByRole("heading", {
        name: expectedTitle,
        level: 1,
      });

      expect(appTitle).toBeInTheDocument();
    });
  });
});
