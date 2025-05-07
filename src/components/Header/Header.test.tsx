import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Given the Header component", () => {
  describe("When it renders", () => {
    test("Then it should show 'read Path' inside a level 1 heading", () => {
      const expectedTitle = /(?=.*^read)(?=.*path$)/i;

      render(<Header />);

      const appTitle = screen.getByRole("heading", {
        name: expectedTitle,
        level: 1,
      });

      expect(appTitle).toBeInTheDocument();
    });

    test("Then it should show an image of a logo with an open book and a path between the pages", () => {
      const expectedImageAlt =
        /logo with an open book and a path between the pages/i;

      render(<Header />);

      const headerImage = screen.getByAltText(expectedImageAlt);

      expect(headerImage).toBeInTheDocument();
    });
  });
});
