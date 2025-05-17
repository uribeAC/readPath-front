import { render, screen } from "@testing-library/react";
import AppRouter from "./AppRouter";
import ContextProvider from "../test-utils/ContextProvider";

describe("Given the AppRouter component", () => {
  describe("When it renders in path /mangas", () => {
    test("Then it should show 'Page not found' inside a heading", async () => {
      const expectedPageTitle = /page not found/i;

      render(
        <ContextProvider initialEntries={["/mangas"]}>
          <AppRouter />
        </ContextProvider>,
      );

      const pageTitle = await screen.findByRole("heading", {
        name: expectedPageTitle,
      });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});
