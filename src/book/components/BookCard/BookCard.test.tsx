import { render, screen } from "@testing-library/react";
import { narutoBook } from "../../fixtures/fixtures";
import BookCard from "./BookCard";

describe("Given the BookCard component", () => {
  describe("When it receives Naruto Vol. 1 book", () => {
    test("Then it should show Naruto Vol. 1 inside a heading", () => {
      const expectedTitle = /naruto vol. 1/i;

      render(<BookCard book={narutoBook} index={1} />);

      const bookTitle = screen.getByRole("heading", { name: expectedTitle });

      expect(bookTitle).toBeInTheDocument();
    });

    test("Then it should show an image of Naruto Volume 1 Cover", () => {
      render(<BookCard book={narutoBook} index={1} />);

      const bookImage = screen.getByAltText(narutoBook.imageAlt);

      expect(bookImage).toBeInTheDocument();
    });

    test("Then it should show a 4 star rating", () => {
      const expectedLabel = /4 star rating/i;

      render(<BookCard book={narutoBook} index={1} />);

      const ratingStars = screen.getByLabelText(expectedLabel);

      expect(ratingStars).toBeInTheDocument();
    });
  });
});
