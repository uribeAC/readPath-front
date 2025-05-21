import { render, screen, within } from "@testing-library/react";
import { Route, Routes } from "react-router";
import ContextProvider from "../../../test-utils/ContextProvider";
import { dragonBallRead } from "../../fixtures/fixtures";
import { demonSlayerVol1 } from "../../fixtures/fixturesDto";
import ModifyBookPage from "./ModifyBookPage";

describe("Given the ModifyBookPage component", () => {
  describe("When it renders in path /modify-book/:dragonBallId", () => {
    test("Then it should show 'Modify: Dragon Ball, Vol. 1' inside a heading", async () => {
      const expectedPageTitle = /modify: dragon ball, vol. 1/i;

      render(
        <ContextProvider initialEntries={[`/modify-book/${dragonBallRead.id}`]}>
          <Routes>
            <Route path="/modify-book/:bookId" element={<ModifyBookPage />} />
          </Routes>
        </ContextProvider>,
      );

      const pageTitle = await screen.findByRole("heading", {
        name: expectedPageTitle,
      });

      expect(pageTitle).toBeInTheDocument();
    });

    test("Then it should show a 'modify book' button", async () => {
      const expectedButtonMessage = /modify book/i;

      render(
        <ContextProvider initialEntries={[`/modify-book/${dragonBallRead.id}`]}>
          <Routes>
            <Route path="/modify-book/:bookId" element={<ModifyBookPage />} />
          </Routes>
        </ContextProvider>,
      );

      const modifyButton = await screen.findByRole("button", {
        name: expectedButtonMessage,
      });

      expect(modifyButton).toBeInTheDocument();
    });

    test("Then it should show 'Akira Toriyama' in 'Author' text box", async () => {
      const bookAuthor = "Akira Toriyama";
      const expectedLabel = /author/i;

      render(
        <ContextProvider initialEntries={[`/modify-book/${dragonBallRead.id}`]}>
          <Routes>
            <Route path="/modify-book/:bookId" element={<ModifyBookPage />} />
          </Routes>
        </ContextProvider>,
      );

      const authorTextBox = await screen.findByLabelText(expectedLabel);

      expect(authorTextBox).toHaveValue(bookAuthor);
    });

    test("Then it should show 'Akira Toriyama' in 'Author' text box", async () => {
      const genresSelected = /genres selected/i;
      const mangaGenre = "Manga";
      const actionGenre = "Action";

      render(
        <ContextProvider initialEntries={[`/modify-book/${dragonBallRead.id}`]}>
          <Routes>
            <Route path="/modify-book/:bookId" element={<ModifyBookPage />} />
          </Routes>
        </ContextProvider>,
      );

      const selectedGenresTitle = await screen.findByRole("heading", {
        name: genresSelected,
      });

      const selectedGenresGroup = selectedGenresTitle.closest("div")!;

      const manga = within(selectedGenresGroup).getByText(mangaGenre);
      const action = within(selectedGenresGroup).getByText(actionGenre);

      expect(manga).toBeInTheDocument();
      expect(action).toBeInTheDocument();
    });
  });

  describe("When it renders in path /modify-book/:demonSlayerId", () => {
    test("Then it should show not show any date started", async () => {
      const expectedLabel = /date started/i;

      render(
        <ContextProvider
          initialEntries={[`/modify-book/${demonSlayerVol1._id}`]}
        >
          <Routes>
            <Route path="/modify-book/:bookId" element={<ModifyBookPage />} />
          </Routes>
        </ContextProvider>,
      );

      const dateStarted = await screen.findByLabelText(expectedLabel);

      expect(dateStarted).toBeInTheDocument();
      expect(dateStarted).toHaveValue("");
    });
  });
});
