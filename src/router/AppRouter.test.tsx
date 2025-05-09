import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AppRouter from "./AppRouter";

describe("Given the AppRouter component", () => {
  describe("When it renders in path /mangas", () => {
    test("Then it should show 'Page not found' inside a heading", () => {
      const expectedPageTitle = /page not found/i;

      render(
        <MemoryRouter initialEntries={["/mangas"]}>
          <AppRouter />
        </MemoryRouter>,
      );

      const pageTitle = screen.getByRole("heading", {
        name: expectedPageTitle,
      });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});
