import { render, screen } from "@testing-library/react";
import ContextProvider from "../../../test-utils/ContextProvider";
import AddBookPage from "./AddBookPage";

describe("Given the AddBookPage component", () => {
  describe("When it renders", () => {
    test("Then it should show 'Add a new book' inside a heading", () => {
      const expectedTitleRegex = /add a new book/i;

      render(
        <ContextProvider>
          <AddBookPage />
        </ContextProvider>,
      );

      const pageTitle = screen.getByRole("heading", {
        name: expectedTitleRegex,
      });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});
