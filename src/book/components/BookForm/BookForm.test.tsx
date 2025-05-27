import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContextProvider from "../../../testUtils/ContextProvider";
import BookForm from "./BookForm";
import type { BookFormData } from "../../types";

const user = userEvent.setup();

describe("Given the BookForm component", () => {
  describe("When it renders", () => {
    const action = vitest.fn();

    beforeEach(() => {
      action.mockClear();
    });

    const initialBookData: BookFormData = {
      title: "",
      author: "",
      description: "",
      saga: "",
      coverImageUrl: "",
      genres: "",
      firstPublished: "",
      pages: 0,
      state: "to read",
      readDates: {
        dateFinished: "",
        dateStarted: "",
        readYear: 0,
      },
      yourRating: "",
    };

    test("Then it should show a 'Title' text box", () => {
      const expectedLabel = /title/i;

      render(
        <ContextProvider>
          <BookForm
            createAction={action}
            isCreate={true}
            initialBookData={initialBookData}
            initialSelectedGenres={[]}
          />
        </ContextProvider>,
      );
      const titleTextBox = screen.getByLabelText(expectedLabel);

      expect(titleTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'To read' checkbox", () => {
      const expectedLabel = /to read/i;

      render(
        <ContextProvider>
          <BookForm
            createAction={action}
            isCreate={true}
            initialBookData={initialBookData}
            initialSelectedGenres={[]}
          />
        </ContextProvider>,
      );

      const toReadCheckbox = screen.getByLabelText(expectedLabel);

      expect(toReadCheckbox).toBeInTheDocument();
    });

    test("Then it should show a 'Genres' options select ", () => {
      const expectedLabel = /genres/i;

      render(
        <ContextProvider>
          <BookForm
            createAction={action}
            isCreate={true}
            initialBookData={initialBookData}
            initialSelectedGenres={[]}
          />
        </ContextProvider>,
      );

      const genresSelect = screen.getByLabelText(expectedLabel);

      expect(genresSelect).toBeInTheDocument();
    });

    test("Then it should not show 'Genres selected:' inside a heading ", () => {
      const expectedTitle = /genres selected/i;

      render(
        <ContextProvider>
          <BookForm
            createAction={action}
            isCreate={true}
            initialBookData={initialBookData}
            initialSelectedGenres={[]}
          />
        </ContextProvider>,
      );
      const genresSelectedTitle = screen.queryByRole("heading", {
        name: expectedTitle,
      });

      expect(genresSelectedTitle).not.toBeInTheDocument();
    });

    test("Then it should show a 'Add book' inside a disabled button", () => {
      const expectedButtonRegex = /add book/i;

      render(
        <ContextProvider>
          <BookForm
            createAction={action}
            isCreate={true}
            initialBookData={initialBookData}
            initialSelectedGenres={[]}
          />
        </ContextProvider>,
      );

      const submitButton = screen.getByRole("button", {
        name: expectedButtonRegex,
      });

      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    describe("And the user types 'Dragon Ball Vol. 1' in 'Title' text box", () => {
      test("Then it should show 'Dragon Ball Vol. 1' in 'Title' text box", async () => {
        const bookTitle = "Dragon Ball Vol. 1";
        const expectedLabel = /title/i;

        render(
          <ContextProvider>
            <BookForm
              createAction={action}
              isCreate={true}
              initialBookData={initialBookData}
              initialSelectedGenres={[]}
            />
          </ContextProvider>,
        );

        const titleTextBox = screen.getByLabelText(expectedLabel);

        await user.type(titleTextBox, bookTitle);

        expect(titleTextBox).toHaveValue(bookTitle);
      });
    });

    describe("And the user selects 'Fantasy' in 'Genres' options select", () => {
      test("Then it should show 'Fantasy' in 'Genres' options select", async () => {
        const genre = "Fantasy";
        const expectedLabel = /genres/i;

        render(
          <ContextProvider>
            <BookForm
              createAction={action}
              isCreate={true}
              initialBookData={initialBookData}
              initialSelectedGenres={[]}
            />
          </ContextProvider>,
        );

        const genresSelect = screen.getByLabelText(expectedLabel);

        await user.selectOptions(genresSelect, genre);

        expect(genresSelect).toHaveValue(genre);
      });
    });

    describe("And the user selects 'Fiction' and 'Non-fiction' in 'Genres' options select", () => {
      test("Then it should show 'Fiction' and 'Non-fiction' as genres selected", async () => {
        const genresSelected = /genres selected/i;
        const fictionGenre = "Fiction";
        const nonFictionGenre = "Non-fiction";
        const expectedLabel = /genres/i;

        render(
          <ContextProvider>
            <BookForm
              createAction={action}
              isCreate={true}
              initialBookData={initialBookData}
              initialSelectedGenres={[]}
            />
          </ContextProvider>,
        );

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

          render(
            <ContextProvider>
              <BookForm
                createAction={action}
                isCreate={true}
                initialBookData={initialBookData}
                initialSelectedGenres={[]}
              />
            </ContextProvider>,
          );

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

            render(
              <ContextProvider>
                <BookForm
                  createAction={action}
                  isCreate={true}
                  initialBookData={initialBookData}
                  initialSelectedGenres={[]}
                />
              </ContextProvider>,
            );

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
        render(
          <ContextProvider>
            <BookForm
              createAction={action}
              isCreate={true}
              initialBookData={initialBookData}
              initialSelectedGenres={[]}
            />
          </ContextProvider>,
        );

        const readCheckbox = screen.getByLabelText("Read");

        await user.click(readCheckbox);

        expect(readCheckbox).toBeChecked();
      });
    });

    describe("And the user fills the form and clicks on 'Add book' button", () => {
      test("Then it should show 'Add book' button enabled and it should call the button action", async () => {
        render(
          <ContextProvider>
            <BookForm
              createAction={action}
              isCreate={true}
              initialBookData={initialBookData}
              initialSelectedGenres={[]}
            />
          </ContextProvider>,
        );

        const titleTextBox = screen.getByLabelText(/title:/i);
        const authorTextBox = screen.getByLabelText(/author:/i);
        const descriptionTextBox = screen.getByLabelText(/description:/i);
        const sagaTextBox = screen.getByLabelText(/saga:/i);
        const coverImageTextBox = screen.getByLabelText(/cover image url:/i);
        const genresSelect = screen.getByLabelText(/genres:/i);
        const publishedTextBox = screen.getByLabelText(/first published:/i);
        const pagesTextBox = screen.getByLabelText(/total pages:/i);
        const stateCheckbox = screen.getByLabelText(/^read/i);
        const dateStartedTextBox = screen.getByLabelText(/date started:/i);
        const dateFinishedTextBox = screen.getByLabelText(/date finished:/i);
        const ratingTextBox = screen.getByLabelText(/your rating/i);

        await user.type(titleTextBox, "Coraline");
        await user.type(authorTextBox, "Neil Gaiman");
        await user.type(
          descriptionTextBox,
          "In Coraline's family's new flat are twenty-one windows and fourteen doors. Thirteen of the doors open and close. ",
        );
        await user.type(sagaTextBox, "Coraline world, 1");
        await user.type(
          coverImageTextBox,
          "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1722023643i/202086824.jpg",
        );
        await user.selectOptions(genresSelect, "Fantasy");
        await user.selectOptions(genresSelect, "Horror");
        await user.type(publishedTextBox, "2002-07-02");
        await user.type(pagesTextBox, "300");
        await user.click(stateCheckbox);
        await user.type(dateStartedTextBox, "2002-07-02");
        await user.type(dateFinishedTextBox, "2002-07-02");
        await user.type(ratingTextBox, "5");

        const submitButton = screen.getByRole("button", { name: /add book/i });

        expect(submitButton).toBeEnabled();

        await user.click(submitButton);

        expect(action).toHaveBeenCalled();
      });
    }, 15000);
  });
});
