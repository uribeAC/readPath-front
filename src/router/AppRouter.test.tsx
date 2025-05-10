import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store from "../store/store";

describe("Given the AppRouter component", () => {
  describe("When it renders in path /mangas", () => {
    test("Then it should show 'Page not found' inside a heading", () => {
      const expectedPageTitle = /page not found/i;

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/mangas"]}>
            <AppRouter />
          </MemoryRouter>
        </Provider>,
      );

      const pageTitle = screen.getByRole("heading", {
        name: expectedPageTitle,
      });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});
