import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { MemoryRouter } from "react-router";

describe("Given the Navigation component", () => {
  describe("When it renders", () => {
    test("Then it should show a 'Bookshelf' link", () => {
      const expectedLinkName = /bookshelf/i;

      render(<Navigation />, { wrapper: MemoryRouter });

      const bookshelfLink = screen.getByRole("link", {
        name: expectedLinkName,
      });

      expect(bookshelfLink).toBeInTheDocument();
    });

    test("Then it should show an icon of an open book", () => {
      const expectedImageAlt = /icon of an open book/i;

      render(<Navigation />, { wrapper: MemoryRouter });

      const bookshelfIcon = screen.getByAltText(expectedImageAlt);

      expect(bookshelfIcon).toBeInTheDocument();
    });
  });
});
