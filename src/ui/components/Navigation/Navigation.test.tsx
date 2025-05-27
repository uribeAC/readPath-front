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

    test("Then it should show a 'Add book' link", () => {
      const expectedLinkName = /add book/i;

      render(<Navigation />, { wrapper: MemoryRouter });

      const addBookLink = screen.getByRole("link", {
        name: expectedLinkName,
      });

      expect(addBookLink).toBeInTheDocument();
    });

    test("Then it should show a 'Book stats' link", () => {
      const expectedLinkName = /book stats/i;

      render(<Navigation />, { wrapper: MemoryRouter });

      const statsLink = screen.getByRole("link", {
        name: expectedLinkName,
      });

      expect(statsLink).toBeInTheDocument();
    });
  });
});
