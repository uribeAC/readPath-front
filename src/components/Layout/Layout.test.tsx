import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContextProvider from "../../test-utils/ContextProvider";
import { http, HttpResponse } from "msw";
import { server } from "../../book/mocks/node";
import AppTestRouter from "../../router/AppTestRouter";
import Layout from "./Layout";
import type { BooksInfoDto } from "../../book/client/types";
import { demonSlayerVol1, onePieceVol1 } from "../../book/fixtures/fixturesDto";
import { dragonBallRead } from "../../book/fixtures/fixtures";

const user = userEvent.setup();
window.scrollTo = vitest.fn();

describe("Given the Layout component", () => {
  describe("When it renders", () => {
    test("Then it should show 'read Path' inside a level 1 heading", () => {
      const expectedTitle = /readPath/i;

      render(
        <ContextProvider>
          <Layout />
        </ContextProvider>,
      );

      const appTitle = screen.getByRole("heading", {
        name: expectedTitle,
        level: 1,
      });

      expect(appTitle).toBeInTheDocument();
    });

    test("Then it should show a 'Bookshelf' link", () => {
      const expectedLinkName = /bookshelf/i;

      render(
        <ContextProvider>
          <Layout />
        </ContextProvider>,
      );

      const bookshelfLink = screen.getByRole("link", {
        name: expectedLinkName,
      });

      expect(bookshelfLink).toBeInTheDocument();
    });
  });

  describe("When it renders in path /books", () => {
    test("Then it should show Naruto Vol. 1 and Spy X Family Vol. 1 book titles inside a heading", async () => {
      const expectedNarutoTitle = /naruto vol. 1/i;
      const expectedSpyFamilyTitle = /spy x family vol. 1/i;

      render(
        <ContextProvider initialEntries={["/books"]}>
          <Layout />
          <AppTestRouter />
        </ContextProvider>,
      );

      const narutoTitle = await screen.findByRole("heading", {
        name: expectedNarutoTitle,
      });
      const spyFamilyTitle = await screen.findByRole("heading", {
        name: expectedSpyFamilyTitle,
      });

      expect(narutoTitle).toBeInTheDocument();
      expect(spyFamilyTitle).toBeInTheDocument();
    });

    describe("And the user click's the to read button of Naruto Vol. 1", () => {
      test("Then it should show the to read button disabled", async () => {
        const expectedNarutoTitle = /naruto vol. 1/i;
        const expectedToReadButton = /^to read/i;

        render(
          <ContextProvider initialEntries={["/books"]}>
            <Layout />
            <AppTestRouter />
          </ContextProvider>,
        );

        const narutoTitle = await screen.findByRole("heading", {
          name: expectedNarutoTitle,
        });
        const narutoCard = narutoTitle.closest("article");

        const toReadButton = within(narutoCard!).getByRole("button", {
          name: expectedToReadButton,
        });

        await user.click(toReadButton);

        expect(toReadButton).toBeDisabled();
      });
    });

    describe("And the user click's the read button of One Piece Vol. 1", () => {
      test("Then it should show the read button disabled", async () => {
        const expectedOnePieceTitle = /one piece vol. 1/i;
        const expectedReadButton = /^read/i;

        render(
          <ContextProvider initialEntries={["/books"]}>
            <Layout />
            <AppTestRouter />
          </ContextProvider>,
        );

        const onePieceTitle = await screen.findByRole("heading", {
          name: expectedOnePieceTitle,
        });
        const onePieceCard = onePieceTitle.closest("article");

        const readButton = within(onePieceCard!).getByRole("button", {
          name: expectedReadButton,
        });

        await user.click(readButton);

        expect(readButton).toBeDisabled();
      });
    });

    describe("And the user clicks the link '>' with label 'Next page'", () => {
      test("Then it should show Vinland Saga and Demon Slayer Vol. 1 books titles inside a heading", async () => {
        const expectedNarutoTitle = /naruto vol. 1/i;
        const expectedVinlandTitle = /vinland saga vol. 1/i;
        const expectedDemonTitle = /demon slayer: kimetsu no yaiba vol. 1/i;

        render(
          <ContextProvider initialEntries={["/books"]}>
            <Layout />
            <AppTestRouter />
          </ContextProvider>,
        );

        const narutoTitle = await screen.findByRole("heading", {
          name: expectedNarutoTitle,
        });

        expect(narutoTitle).toBeInTheDocument();

        const nextPageLink = screen.getByLabelText(/next page/i);

        await user.click(nextPageLink);

        const vinlandTitle = await screen.findByRole("heading", {
          name: expectedVinlandTitle,
        });
        const demonTitle = await screen.findByRole("heading", {
          name: expectedDemonTitle,
        });

        expect(vinlandTitle).toBeInTheDocument();
        expect(demonTitle).toBeInTheDocument();

        expect(narutoTitle).not.toBeInTheDocument();
      });
    });

    describe("And the user click's the 'see book details' button of One Piece Vol. 1", () => {
      test("Then it should show the book description of One Piece Vol. 1", async () => {
        const expectedOnePieceTitle = /one piece vol. 1/i;
        const detailsButtonText = /see book details/i;

        render(
          <ContextProvider initialEntries={["/books"]}>
            <Layout />
            <AppTestRouter />
          </ContextProvider>,
        );

        const onePieceTitle = await screen.findByRole("heading", {
          name: expectedOnePieceTitle,
        });
        const onePieceCard = onePieceTitle.closest("article");

        const detailsButton = within(onePieceCard!).getByRole("link", {
          name: detailsButtonText,
        });

        await user.click(detailsButton);

        const onePieceDescription = await screen.findByText(
          onePieceVol1.description,
        );

        expect(onePieceDescription).toBeInTheDocument();
      });
    });

    describe("And the user click's the 'modify' button of One Piece Vol. 1", () => {
      test("Then it should show 'Modify: One Piece Vol. 1'", async () => {
        const expectedOnePieceTitle = /one piece vol. 1/i;
        const expectedPageTitle = /modify: one piece vol. 1/i;
        const modifyButtonText = /modify book/i;

        render(
          <ContextProvider initialEntries={["/books"]}>
            <Layout />
            <AppTestRouter />
          </ContextProvider>,
        );

        const onePieceTitle = await screen.findByRole("heading", {
          name: expectedOnePieceTitle,
        });
        const onePieceCard = onePieceTitle.closest("article");

        const modifyButton = within(onePieceCard!).getByRole("link", {
          name: modifyButtonText,
        });

        await user.click(modifyButton);

        const pageTitle = await screen.findByRole("heading", {
          name: expectedPageTitle,
        });

        expect(pageTitle).toBeInTheDocument();
      });
    });
  });

  describe("When it renders in path /books?page=2", () => {
    test("Then it should show Vinland Saga and Demon Slayer Vol. 1 books titles inside a heading", async () => {
      const expectedVinlandTitle = /vinland saga vol. 1/i;
      const expectedDemonTitle = /demon slayer: kimetsu no yaiba vol. 1/i;

      render(
        <ContextProvider initialEntries={["/books?page=2"]}>
          <Layout />
          <AppTestRouter />
        </ContextProvider>,
      );

      const vinlandTitle = await screen.findByRole("heading", {
        name: expectedVinlandTitle,
      });
      const demonTitle = await screen.findByRole("heading", {
        name: expectedDemonTitle,
      });

      expect(vinlandTitle).toBeInTheDocument();
      expect(demonTitle).toBeInTheDocument();
    });

    describe("And the user clicks the 'delete button' of Vinland Saga book", () => {
      test("Then it should show the message 'Book deleted from bookshelf'", async () => {
        const expectedVinlandTitle = /vinland saga vol. 1/i;
        const expectedButtonLabel = /delete book/i;
        const expectedModalMessage = /book deleted from bookshelf/i;

        render(
          <ContextProvider initialEntries={["/books?page=2"]}>
            <Layout />
            <AppTestRouter />
          </ContextProvider>,
        );

        const vinlandTitle = await screen.findByRole("heading", {
          name: expectedVinlandTitle,
        });

        expect(vinlandTitle).toBeInTheDocument();

        const vinlandCard = vinlandTitle.closest("article")!;

        const deleteButton = await within(vinlandCard).findByRole("button", {
          name: expectedButtonLabel,
        });
        await user.click(deleteButton);

        const modal = await screen.findByText(expectedModalMessage);

        expect(modal).toBeInTheDocument();
      });

      describe("And the user clicks the 'close modal' button of the 'Book deleted from bookshelf' message", () => {
        test("Then it should not show Vinland Saga book title inside a heading anymore", async () => {
          const apiUrl = import.meta.env.VITE_API_URL;

          const expectedVinlandTitle = /vinland saga vol. 1/i;
          const expectedButtonLabel = /delete book/i;
          const expectedModalMessage = /book deleted from bookshelf/i;
          const expectedModalButton = /close modal/i;

          render(
            <ContextProvider initialEntries={["/books?page=2"]}>
              <Layout />
              <AppTestRouter />
            </ContextProvider>,
          );

          const vinlandTitle = await screen.findByRole("heading", {
            name: expectedVinlandTitle,
          });

          expect(vinlandTitle).toBeInTheDocument();

          const vinlandCard = vinlandTitle.closest("article")!;

          const deleteButton = await within(vinlandCard).findByRole("button", {
            name: expectedButtonLabel,
          });

          server.use(
            http.get(`${apiUrl}/books`, () => {
              return HttpResponse.json<BooksInfoDto>({
                books: [demonSlayerVol1],
                totals: {
                  books: 12,
                  booksRead: 7,
                  booksToRead: 5,
                },
              });
            }),
          );

          await user.click(deleteButton);

          const modalMessage = await screen.findByText(expectedModalMessage);

          expect(modalMessage).toBeInTheDocument();

          const modal = modalMessage.closest("div")!;

          const closeModalButton = await within(modal).getByRole("button", {
            name: expectedModalButton,
          });

          await user.click(closeModalButton);

          const vinlandDeletedTitle = await screen.queryByRole("heading", {
            name: expectedVinlandTitle,
          });

          expect(vinlandDeletedTitle).not.toBeInTheDocument();
        });
      });
    });

    describe("And the user clicks the link '<' with label 'Previous page'", () => {
      test("Then it should show Naruto Vol. 1 and Spy X Family Vol. 1 book titles inside a heading", async () => {
        const expectedNarutoTitle = /naruto vol. 1/i;
        const expectedSpyFamilyTitle = /spy x family vol. 1/i;
        const expectedVinlandTitle = /vinland saga vol. 1/i;

        render(
          <ContextProvider initialEntries={["/books?page=2"]}>
            <Layout />
            <AppTestRouter />
          </ContextProvider>,
        );

        const vinlandTitle = await screen.findByRole("heading", {
          name: expectedVinlandTitle,
        });

        expect(vinlandTitle).toBeInTheDocument();

        const nextPageLink = screen.getByLabelText(/previous page/i);

        await user.click(nextPageLink);

        const narutoTitle = await screen.findByRole("heading", {
          name: expectedNarutoTitle,
        });
        const spyFamilyTitle = await screen.findByRole("heading", {
          name: expectedSpyFamilyTitle,
        });

        expect(narutoTitle).toBeInTheDocument();
        expect(spyFamilyTitle).toBeInTheDocument();

        expect(vinlandTitle).not.toBeInTheDocument();
      });
    });
  });

  describe("When it renders in path /add book", () => {
    test("Then it should show 'Add a new book' inside a heading", async () => {
      const expectedTitleRegex = /add a new book/i;

      render(
        <ContextProvider initialEntries={["/add-book"]}>
          <Layout />
          <AppTestRouter />
        </ContextProvider>,
      );

      const pageTitle = await screen.findByRole("heading", {
        name: expectedTitleRegex,
      });

      expect(pageTitle).toBeInTheDocument();
    });

    describe("And the user fills the form and submits the book", () => {
      test("Then it should show the 'Book added to bookshelf' message", async () => {
        render(
          <ContextProvider initialEntries={["/add-book"]}>
            <Layout />
            <AppTestRouter />
          </ContextProvider>,
        );

        const titleTextBox = await screen.findByLabelText(/title:/i);
        const authorTextBox = await screen.findByLabelText(/author:/i);
        const descriptionTextBox =
          await screen.findByLabelText(/description:/i);
        const coverImageTextBox =
          await screen.findByLabelText(/cover image url:/i);
        const genresSelect = await screen.findByLabelText(/genres:/i);
        const publishedTextBox =
          await screen.findByLabelText(/first published:/i);
        const pagesTextBox = await screen.findByLabelText(/total pages:/i);
        const stateCheckbox = await screen.findByRole("checkbox", {
          name: /^read/i,
        });

        await user.type(titleTextBox, "Dragon Ball, Vol. 1");
        await user.type(authorTextBox, "Akira Toriyama");
        await user.type(
          descriptionTextBox,
          "Follow the adventures of a young monkey-tailed boy named Goku",
        );
        await user.type(coverImageTextBox, "https://images-na.jpg");
        await user.selectOptions(genresSelect, "Adventure");
        await user.type(publishedTextBox, "2003-05-06");
        await user.type(pagesTextBox, "192");
        await user.click(stateCheckbox);

        const submitButton = await screen.findByRole("button", {
          name: /add book/i,
        });
        await user.click(submitButton);

        const expectedMessage = /book added to bookshelf/i;
        const modalMessage = await screen.findByText(expectedMessage);

        expect(modalMessage).toBeInTheDocument();
      });
    }, 7000);
  });

  describe("When it renders in path /modify-book/:dragonBallId", async () => {
    test("Then it should show 'Modify: Dragon Ball, Vol. 1' inside a heading", async () => {
      const expectedPageTitle = /modify: dragon ball, vol. 1/i;

      render(
        <ContextProvider initialEntries={[`/modify-book/${dragonBallRead.id}`]}>
          <Layout />
          <AppTestRouter />
        </ContextProvider>,
      );

      const pageTitle = await screen.findByRole("heading", {
        name: expectedPageTitle,
      });

      expect(pageTitle).toBeInTheDocument();
    });

    describe("And the user modifies the title to 'Dragon Ball, Vol. 12' and submits it", () => {
      test("Then it should show the 'Book modified correctly' message", async () => {
        const expectedMessage = /book modified correctly/i;
        const bookModifiedTitle = "Dragon Ball, Vol. 12";
        const expectedLabel = /title/i;

        render(
          <ContextProvider
            initialEntries={[`/modify-book/${dragonBallRead.id}`]}
          >
            <Layout />
            <AppTestRouter />
          </ContextProvider>,
        );

        const titleTextBox = await screen.findByLabelText(expectedLabel);

        await user.clear(titleTextBox);
        await user.type(titleTextBox, bookModifiedTitle);

        const submitButton = await screen.findByRole("button", {
          name: /modify book/i,
        });
        await user.click(submitButton);

        const modalMessage = await screen.findByText(expectedMessage);

        expect(modalMessage).toBeInTheDocument();
      });
    });
  });
});
