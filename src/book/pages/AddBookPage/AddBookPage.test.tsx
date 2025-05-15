import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import AddBookPage from "./AddBookPage";
import store from "../../../store/store";

describe("Given the AddBookPage component", () => {
  describe("When it renders", () => {
    test("Then it should show 'Add a new book' inside a heading", () => {
      const expectedTitleRegex = /add a new book/i;

      render(
        <Provider store={store}>
          <AddBookPage />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const pageTitle = screen.getByRole("heading", {
        name: expectedTitleRegex,
      });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});
