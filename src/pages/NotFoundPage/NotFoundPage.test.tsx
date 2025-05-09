import { render, screen } from "@testing-library/react";
import NotFoundPage from "./NotFoundPage";

describe("Given the NotFoundPage component", () => {
  describe("When it renders", () => {
    test("Then it should show a'Page not found' inside a heading", () => {
      const expectedPageTitle = /page not found/i;

      render(<NotFoundPage />);

      const pageTitle = screen.getByRole("heading", {
        name: expectedPageTitle,
      });

      expect(pageTitle).toBeInTheDocument();
    });

    test("Then it should show a image of a book with a magnified glass showing a 404", () => {
      const expectedImageAlt = /book with a magnified glass showing a 404/i;

      render(<NotFoundPage />);

      const notFoundImage = screen.getByAltText(expectedImageAlt);

      expect(notFoundImage).toBeInTheDocument();
    });
  });
});
