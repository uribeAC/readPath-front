import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContextProvider from "../test-utils/ContextProvider";
import AppRouter from "./AppRouter";
import { dragonBallRead } from "../book/fixtures/fixtures";

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

    describe("And the user clicks the Book stats link", () => {
      test("Then it should show 'Bookshelf stats' inside a heading", async () => {
        const expectedLinkName = /book stats/i;
        const expectedPageTitle = /bookshelf stats/i;

        render(
          <ContextProvider initialEntries={["/mangas"]}>
            <AppRouter />
          </ContextProvider>,
        );

        const statsLink = screen.getByRole("link", {
          name: expectedLinkName,
        });

        await user.click(statsLink);

        const pageTitle = await screen.findByRole("heading", {
          name: expectedPageTitle,
        });

        expect(pageTitle).toBeInTheDocument();
      });
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

  describe("When it renders in path /book/:bookId of Dragon Ball book id", () => {
    describe("And the user clicks the 'to read' button", () => {
      test("Then it should show the to read button disabled", async () => {
        const expectedToReadButton = /^to read/i;

        render(
          <ContextProvider initialEntries={[`/book/${dragonBallRead.id}`]}>
            <AppRouter />
          </ContextProvider>,
        );

        const toReadButton = await screen.findByRole("button", {
          name: expectedToReadButton,
        });

        await user.click(toReadButton);

        expect(toReadButton).toBeDisabled();
      });

      describe("And the user clicks the 'read' button", () => {
        test("Then it should show the read button disabled", async () => {
          const expectedToReadButton = /^to read/i;
          const expectedReadButton = /^read/i;

          render(
            <ContextProvider initialEntries={[`/book/${dragonBallRead.id}`]}>
              <AppRouter />
            </ContextProvider>,
          );

          const toReadButton = await screen.findByRole("button", {
            name: expectedToReadButton,
          });

          await user.click(toReadButton);

          expect(toReadButton).toBeDisabled();

          const readButton = await screen.findByRole("button", {
            name: expectedReadButton,
          });

          await user.click(readButton);

          expect(readButton).toBeDisabled();
        });
      });
    });

    describe("And the user clicks the 'modify book' button", () => {
      test("Then it should show 'Modify: Dragon Ball Vol. 1' inside a heading", async () => {
        const expectedModifyButton = /modify book/i;
        const expectedTitle = /modify: dragon ball, vol. 1/i;

        render(
          <ContextProvider initialEntries={[`/book/${dragonBallRead.id}`]}>
            <AppRouter />
          </ContextProvider>,
        );

        const modifyButton = await screen.findByRole("link", {
          name: expectedModifyButton,
        });

        await user.click(modifyButton);

        const modifyTitle = await screen.findByRole("heading", {
          name: expectedTitle,
        });

        expect(modifyTitle).toBeInTheDocument();
      });
    });

    describe("And the user clicks the 'Delete book' button", () => {
      test("Then it should show 'Book deleted from bookshelf' message", async () => {
        const expectedDeleteButton = /delete book/i;
        const expectedMessage = /book deleted from bookshelf/i;

        render(
          <ContextProvider initialEntries={[`/book/${dragonBallRead.id}`]}>
            <AppRouter />
          </ContextProvider>,
        );

        const deleteButton = await screen.findByRole("button", {
          name: expectedDeleteButton,
        });

        await user.click(deleteButton);

        const modal = await screen.findByText(expectedMessage);

        expect(modal).toBeInTheDocument();
      });
    });
  });
});
