import { render, screen } from "@testing-library/react";
import ContextProvider from "../../../test-utils/ContextProvider";
import { narutoBook } from "../../fixtures/fixtures";
import BookCard from "./BookCard";

describe("Given the BookCard component", () => {
  describe("When it receives Naruto Vol. 1 book", () => {
    test("Then it should show Naruto Vol. 1 inside a heading", () => {
      const expectedTitle = /naruto vol. 1/i;

      render(
        <ContextProvider>
          <BookCard book={narutoBook} index={1} />
        </ContextProvider>,
      );

      const bookTitle = screen.getByRole("heading", { name: expectedTitle });

      expect(bookTitle).toBeInTheDocument();
    });

    test("Then it should show an image of Naruto Volume 1 Cover", () => {
      render(
        <ContextProvider>
          <BookCard book={narutoBook} index={1} />
        </ContextProvider>,
      );

      const bookImage = screen.getByAltText(narutoBook.imageAlt);

      expect(bookImage).toBeInTheDocument();
    });

    test("Then it should show a 4 star rating", () => {
      const expectedLabel = /4 star rating/i;

      render(
        <ContextProvider>
          <BookCard book={narutoBook} index={1} />
        </ContextProvider>,
      );

      const ratingStars = screen.getByLabelText(expectedLabel);

      expect(ratingStars).toBeInTheDocument();
    });

    test("Then it should show a delete book button", () => {
      const expectedButtonLabel = /delete book/i;

      render(
        <ContextProvider>
          <BookCard book={narutoBook} index={1} />
        </ContextProvider>,
      );

      const deleteButton = screen.getByRole("button", {
        name: expectedButtonLabel,
      });

      expect(deleteButton).toBeInTheDocument();
    });

    test("Then it should show a modify book button", () => {
      const expectedButtonLabel = /modify book/i;

      render(
        <ContextProvider>
          <BookCard book={narutoBook} index={1} />
        </ContextProvider>,
      );

      const modifyButton = screen.getByRole("link", {
        name: expectedButtonLabel,
      });

      expect(modifyButton).toBeInTheDocument();
    });

    test("Then it should show a see book details button", () => {
      const expectedButtonLabel = /see book details/i;

      render(
        <ContextProvider>
          <BookCard book={narutoBook} index={1} />
        </ContextProvider>,
      );

      const detailsButton = screen.getByRole("link", {
        name: expectedButtonLabel,
      });

      expect(detailsButton).toBeInTheDocument();
    });
  });
});
