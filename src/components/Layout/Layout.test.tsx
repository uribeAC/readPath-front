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
});
