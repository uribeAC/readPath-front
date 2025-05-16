import { render, screen } from "@testing-library/react";
import ContextProvider from "../../../test-utils/ContextProvider";
import BooksPage from "./BooksPage";

describe("Given the BooksPage component", () => {
  describe("When it renders", () => {
    test("Then it should show 'Bookshelf' inside a heading", async () => {
      const expectedPageTitle = /bookshelf/i;

      render(
        <ContextProvider>
          <BooksPage />
        </ContextProvider>,
      );

      const pageTitle = await screen.findByRole("heading", {
        name: expectedPageTitle,
      });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});
