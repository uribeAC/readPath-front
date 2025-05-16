import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import Layout from "./Layout";
import store from "../../store/store";
import AppTestRouter from "../../router/AppTestRouter";

const user = userEvent.setup();
window.scrollTo = vitest.fn();

describe("Given the Layout component", () => {
  describe("When it renders", () => {
    test("Then it should show 'read Path' inside a level 1 heading", () => {
      const expectedTitle = /readPath/i;

      render(<Layout />, { wrapper: MemoryRouter });

      const appTitle = screen.getByRole("heading", {
        name: expectedTitle,
        level: 1,
      });

      expect(appTitle).toBeInTheDocument();
    });

    test("Then it should show a 'Bookshelf' link", () => {
      const expectedLinkName = /bookshelf/i;

      render(<Layout />, { wrapper: MemoryRouter });

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
        <Provider store={store}>
          <MemoryRouter initialEntries={["/books"]}>
            <Layout />
            <AppTestRouter />
          </MemoryRouter>
        </Provider>,
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

    describe("And the user clicks the link '>' with label 'Next page'", () => {
      test("Then it should show Vinland Saga and Demon Slayer Vol. 1 books titles inside a heading", async () => {
        const expectedNarutoTitle = /naruto vol. 1/i;
        const expectedVinlandTitle = /vinland saga vol. 1/i;
        const expectedDemonTitle = /demon slayer: kimetsu no yaiba vol. 1/i;

        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/books"]}>
              <Layout />
              <AppTestRouter />
            </MemoryRouter>
          </Provider>,
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
  });

  describe("When it renders in path /books?page=2", () => {
    test("Then it should show Vinland Saga and Demon Slayer Vol. 1 books titles inside a heading", async () => {
      const expectedVinlandTitle = /vinland saga vol. 1/i;
      const expectedDemonTitle = /demon slayer: kimetsu no yaiba vol. 1/i;

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/books?page=2"]}>
            <Layout />
            <AppTestRouter />
          </MemoryRouter>
        </Provider>,
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

    describe("And the user clicks the link '<' with label 'Previous page'", () => {
      test("Then it should show Naruto Vol. 1 and Spy X Family Vol. 1 book titles inside a heading", async () => {
        const expectedNarutoTitle = /naruto vol. 1/i;
        const expectedSpyFamilyTitle = /spy x family vol. 1/i;
        const expectedVinlandTitle = /vinland saga vol. 1/i;

        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/books?page=2"]}>
              <Layout />
              <AppTestRouter />
            </MemoryRouter>
          </Provider>,
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
        <Provider store={store}>
          <MemoryRouter initialEntries={["/add-book"]}>
            <Layout />
            <AppTestRouter />
          </MemoryRouter>
        </Provider>,
      );

      const pageTitle = await screen.findByRole("heading", {
        name: expectedTitleRegex,
      });

      expect(pageTitle).toBeInTheDocument();
    });

    describe("And the user fills the form with Dragon Ball Vol. 1 book and submits the book and the user clicks the next page link", () => {
      test("Then it should show the Bookshelf page with Dragon Ball Vol. 1 book", async () => {
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/add-book"]}>
              <Layout />
              <AppTestRouter />
            </MemoryRouter>
          </Provider>,
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
          "Follow the adventures of a young monkey-tailed boy named Goku as he embarks on a journey to collect the seven mystical Dragon Balls. Along the way, he meets Bulma, Master Roshi, and other unforgettable characters in the beginning of this legendary manga series.",
        );
        await user.type(
          coverImageTextBox,
          "https://images-na.ssl-images-amazon.com/images/I/51Ypye1bxBL._SX331_BO1,204,203,200_.jpg",
        );
        await user.selectOptions(genresSelect, "Adventure");
        await user.type(publishedTextBox, "2003-05-06");
        await user.type(pagesTextBox, "192");
        await user.click(stateCheckbox);

        const submitButton = await screen.findByRole("button", {
          name: /add book/i,
        });
        await user.click(submitButton);
        screen.debug();

        const expectedPageTitle = /bookshelf/i;
        const pageTitle = await screen.findByText(expectedPageTitle);

        expect(pageTitle).toBeInTheDocument();

        const nextPage = await screen.findByRole("link", {
          name: /next page/i,
        });
        await user.click(nextPage);

        const dragonBallTitle = await screen.findByRole("heading", {
          name: /dragon ball, vol. 1/i,
        });

        expect(dragonBallTitle).toBeInTheDocument();
      });
    }, 10000);
  });
});
