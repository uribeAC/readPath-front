import { render, screen } from "@testing-library/react";
import ContextProvider from "../../../test-utils/ContextProvider";
import BookFilter from "./BookFilter";

describe("Given the BookFilter component", () => {
  describe("When it renders", () => {
    test("Then it should show 'Filter' inside a heading", () => {
      const expectedTitle = /filter:/i;

      render(
        <ContextProvider>
          <BookFilter />
        </ContextProvider>,
      );

      const filterTitle = screen.getByRole("heading", { name: expectedTitle });

      expect(filterTitle).toBeInTheDocument();
    });

    test("Then it should show 'All' in 'State' options select", () => {
      const expectedLabel = /state/i;
      const expectedState = "All";

      render(
        <ContextProvider>
          <BookFilter />
        </ContextProvider>,
      );

      const stateSelect = screen.getByLabelText(expectedLabel);

      expect(stateSelect).toHaveValue(expectedState);
    });

    test("Then it should show a 'Search' button", () => {
      const expectedButton = /search/i;

      render(
        <ContextProvider>
          <BookFilter />
        </ContextProvider>,
      );

      const button = screen.getByRole("link", { name: expectedButton });

      expect(button).toBeInTheDocument();
    });

    test("Then it should show a 'Clear' button", () => {
      const expectedButton = /clear/i;

      render(
        <ContextProvider>
          <BookFilter />
        </ContextProvider>,
      );

      const button = screen.getByRole("button", { name: expectedButton });

      expect(button).toBeInTheDocument();
    });
  });
});
