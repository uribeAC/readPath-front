import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/store";
import BooksPage from "./BooksPage";
import { MemoryRouter } from "react-router";

describe("Given the BooksPage component", () => {
  describe("When it renders", () => {
    test("Then it should show 'Bookshelf' inside a heading", async () => {
      const expectedPageTitle = /bookshelf/i;

      render(
        <Provider store={store}>
          <BooksPage />,
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const pageTitle = await screen.findByRole("heading", {
        name: expectedPageTitle,
      });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});
