import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookForm from "./BookForm";

const user = userEvent.setup();

describe("Given the BookForm component", () => {
  describe("When it renders", () => {
    test("Then it should show a 'Title' text box", () => {
      const expectedLabel = /title/i;

      render(<BookForm />);

      const titleTextBox = screen.getByLabelText(expectedLabel);

      expect(titleTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'To read' checkbox", () => {
      const expectedLabel = /to read/i;

      render(<BookForm />);

      const toReadCheckbox = screen.getByLabelText(expectedLabel);

      expect(toReadCheckbox).toBeInTheDocument();
    });

    test("Then it should show a 'Genres' options select ", () => {
      const expectedLabel = /genres/i;

      render(<BookForm />);

      const genresSelect = screen.getByLabelText(expectedLabel);

      expect(genresSelect).toBeInTheDocument();
    });

    test("Then it should not show 'Genres selected:' inside a heading ", () => {
      const expectedTitle = /genres selected/i;

      render(<BookForm />);

      const genresSelectedTitle = screen.queryByRole("heading", {
        name: expectedTitle,
      });

      expect(genresSelectedTitle).not.toBeInTheDocument();
    });

    describe("And the user types 'Dragon Ball Vol. 1' in 'Title' text box", () => {
      test("Then it should show 'Dragon Ball Vol. 1' in 'Title' text box", async () => {
        const bookTitle = "Dragon Ball Vol. 1";
        const expectedLabel = /title/i;

        render(<BookForm />);

        const titleTextBox = screen.getByLabelText(expectedLabel);

        await user.type(titleTextBox, bookTitle);

        expect(titleTextBox).toHaveValue(bookTitle);
      });
    });

    describe("And the use selects 'Fantasy' in 'Genres' options select", () => {
      test("Then it should show 'Fantasy' in 'Genres' options select", async () => {
        const genre = "Fantasy";
        const expectedLabel = /genres/i;

        render(<BookForm />);

        const genresSelect = screen.getByLabelText(expectedLabel);

        await user.selectOptions(genresSelect, genre);

        expect(genresSelect).toHaveValue(genre);
      });
    });

    describe("And the use selects 'Fiction' and 'Non-fiction' in 'Genres' options select", () => {
      test("Then it should show 'Fiction' and 'Non-fiction' as genres selected", async () => {
        const genresSelected = /genres selected/i;
        const fictionGenre = "Fiction";
        const nonFictionGenre = "Non-fiction";
        const expectedLabel = /genres/i;

        render(<BookForm />);

        const genresSelect = screen.getByLabelText(expectedLabel);

        await user.selectOptions(genresSelect, fictionGenre);
        await user.selectOptions(genresSelect, nonFictionGenre);

        const selectedGenresTitle = screen.getByRole("heading", {
          name: genresSelected,
        });
        const selectedGenresGroup = selectedGenresTitle.closest("div")!;

        const fiction = within(selectedGenresGroup).getByText(fictionGenre);
        const nonFiction =
          within(selectedGenresGroup).getByText(nonFictionGenre);

        expect(fiction).toBeInTheDocument();
        expect(nonFiction).toBeInTheDocument();
      });

      describe("And the user clicks the 'X' button of 'Non-fiction' selected genre", () => {
        test("Then it should not show anymore 'Non-fiction' as selected genre and only 'Fiction'", async () => {
          const genresSelected = /genres selected/i;
          const fictionGenre = "Fiction";
          const nonFictionGenre = "Non-fiction";
          const expectedLabel = /genres/i;

          render(<BookForm />);

          const genresSelect = screen.getByLabelText(expectedLabel);

          await user.selectOptions(genresSelect, fictionGenre);
          await user.selectOptions(genresSelect, nonFictionGenre);

          const selectedGenresTitle = screen.getByRole("heading", {
            name: genresSelected,
          });
          const selectedGenresGroup = selectedGenresTitle.closest("div")!;

          const fiction = within(selectedGenresGroup).getByText(fictionGenre);
          const nonFiction =
            within(selectedGenresGroup).getByText(nonFictionGenre);

          expect(fiction).toBeInTheDocument();
          expect(nonFiction).toBeInTheDocument();

          const nonFictionGroup = nonFiction.closest("li")!;

          const nonFictionDeleteButton = within(nonFictionGroup).getByRole(
            "button",
            { name: "X" },
          );

          await user.click(nonFictionDeleteButton);

          expect(fiction).toBeInTheDocument();
          expect(nonFiction).not.toBeInTheDocument();
        });

        describe("And the user clicks the 'X' button of 'Fiction' selected genre", () => {
          test("Then it should not show any genre in options select'", async () => {
            const genresSelected = /genres selected/i;
            const fictionGenre = "Fiction";
            const expectedLabel = /genres/i;

            render(<BookForm />);

            const genresSelect = screen.getByLabelText(expectedLabel);

            await user.selectOptions(genresSelect, fictionGenre);

            const selectedGenresTitle = screen.getByRole("heading", {
              name: genresSelected,
            });
            const selectedGenresGroup = selectedGenresTitle.closest("div")!;

            const fiction = within(selectedGenresGroup).getByText(fictionGenre);

            expect(fiction).toBeInTheDocument();

            const fictionGroup = fiction.closest("li")!;

            const fictionDeleteButton = within(fictionGroup).getByRole(
              "button",
              { name: "X" },
            );

            await user.click(fictionDeleteButton);

            expect(fiction).not.toBeInTheDocument();
            expect(genresSelect).toHaveValue("");
          });
        });
      });
    });

    describe("And the user clicks the 'read' button", () => {
      test("Then it should show 'read' as the check state", async () => {
        render(<BookForm />);

        const readCheckbox = screen.getByLabelText("Read");

        await user.click(readCheckbox);

        expect(readCheckbox).toBeChecked();
      });
    });
  });
});
