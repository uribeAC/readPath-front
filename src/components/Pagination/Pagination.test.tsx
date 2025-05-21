import { render, screen } from "@testing-library/react";
import ContextProvider from "../../test-utils/ContextProvider";
import Pagination from "./Pagination";
import { mangaFixtures } from "../../book/fixtures/fixturesDto";

describe("Given the Pagination component", () => {
  describe("When it renders", () => {
    test("Then it should show a '<' and '>' link", () => {
      render(
        <ContextProvider>
          <Pagination booksTotal={mangaFixtures.length} currentPage={1} />
        </ContextProvider>,
      );

      const previousLink = screen.getByLabelText(/previous page/i);
      const nextLink = screen.getByLabelText(/next page/i);

      expect(previousLink).toBeVisible();
      expect(nextLink).toBeVisible();
    });
  });
});
