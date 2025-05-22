import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContextProvider from "../test-utils/ContextProvider";
import AppRouter from "./AppRouter";

const user = userEvent.setup();

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

  describe("When it renders in path /books", () => {
    test("Then it should show an 'Add filter' button", async () => {
      const expectedButton = /add filter/i;

      render(
        <ContextProvider initialEntries={["/books"]}>
          <AppRouter />
        </ContextProvider>,
      );

      const addFilterButton = await screen.findByRole("button", {
        name: expectedButton,
      });

      expect(addFilterButton).toBeInTheDocument();
    });

    describe("And the user clicks the 'Add filter' button", () => {
      test("Then it should show 'Filter' inside a heading", async () => {
        const expectedTitle = /filter:/i;
        const expectedButton = /add filter/i;

        render(
          <ContextProvider initialEntries={["/books"]}>
            <AppRouter />
          </ContextProvider>,
        );

        const addFilterButton = await screen.findByRole("button", {
          name: expectedButton,
        });
        await user.click(addFilterButton);

        const filterTitle = await screen.findByRole("heading", {
          name: expectedTitle,
        });

        expect(filterTitle).toBeInTheDocument();
      });

      describe("And the user selects state as 'to read' and genre as 'Horror' and clicks the 'Search' button", () => {
        test("Then it should show Tokyo Ghoul inside a heading", async () => {
          const expectedButton = /add filter/i;
          const expectedStateLabel = /state/i;
          const expectedGenreLabel = /genre/i;
          const expectedSearchButton = /search/i;
          const expectedBookTitle = /tokyo ghoul vol. 1/i;
          const expectedNotBookTitle = /naruto vol. 1/i;

          render(
            <ContextProvider initialEntries={["/books"]}>
              <AppRouter />
            </ContextProvider>,
          );

          const addFilterButton = await screen.findByRole("button", {
            name: expectedButton,
          });
          await user.click(addFilterButton);

          const stateSelect = await screen.findByLabelText(expectedStateLabel);
          const genreSelect = await screen.findByLabelText(expectedGenreLabel);

          await user.selectOptions(stateSelect, "to read");
          await user.selectOptions(genreSelect, "Horror");

          const searchButton = await screen.findByRole("link", {
            name: expectedSearchButton,
          });

          await user.click(searchButton);

          const tokyoGhoulTitle = await screen.findByRole("heading", {
            name: expectedBookTitle,
          });
          const narutoTitle = await screen.queryByRole("heading", {
            name: expectedNotBookTitle,
          });

          expect(tokyoGhoulTitle).toBeInTheDocument();
          expect(narutoTitle).not.toBeInTheDocument();
        });
      });
    });
  });
});
