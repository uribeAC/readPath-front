import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router";
import ContextProvider from "../../../test-utils/ContextProvider";
import { narutoVol1 } from "../../fixtures/fixturesDto";
import BookDetailPage from "./BookDetailPage";

const user = userEvent.setup();

describe("Given the BookDetailPage component", () => {
  describe("When it receives Naruto Vol. 1 book id", () => {
    const narutoId = narutoVol1._id;

    test("Then it should show 'Naruto Vol. 1' inside a heading", async () => {
      const expectedNarutoTitle = /naruto vol. 1/i;

      render(
        <ContextProvider initialEntries={[`/book/${narutoId}`]}>
          <Routes>
            <Route path="/book/:bookId" element={<BookDetailPage />} />
          </Routes>
        </ContextProvider>,
      );

      const bookTitle = await screen.findByRole("heading", {
        name: expectedNarutoTitle,
      });

      expect(bookTitle).toBeInTheDocument();
    });

    test("Then it should show an image of Naruto Vol. 1 Cover", async () => {
      const expectedNarutoImageAlt = /naruto volume 1 cover/i;

      render(
        <ContextProvider initialEntries={[`/book/${narutoId}`]}>
          <Routes>
            <Route path="/book/:bookId" element={<BookDetailPage />} />
          </Routes>
        </ContextProvider>,
      );

      const bookImage = await screen.findByAltText(expectedNarutoImageAlt);

      expect(bookImage).toBeInTheDocument();
    });

    test("Then it should show only the first 2 paragraphs of the book description", async () => {
      const expectedFirstParapgraphs =
        "Naruto Uzumaki dreams of becoming the greatest ninja in the village, but he harbors a powerful secret.";
      const expectedSecondParapgraphs =
        "Shunned by the villagers for the demon fox sealed within him, Naruto acts out in a desperate bid for attention and recognition. Yet despite his loneliness, he never gives up on his dream to earn the respect of everyone around him.";
      const expectedThirdParapgraphs =
        "When he joins the ninja academy and is placed on a team with the brooding Sasuke and the sharp-tongued Sakura under their teacher Kakashi, Naruto begins to learn the value of teamwork, perseverance, and loyalty in a world where danger lurks behind every mission.";

      render(
        <ContextProvider initialEntries={[`/book/${narutoId}`]}>
          <Routes>
            <Route path="/book/:bookId" element={<BookDetailPage />} />
          </Routes>
        </ContextProvider>,
      );

      const bookDescription = await screen.findByText(
        (text) =>
          text.includes(expectedFirstParapgraphs) &&
          text.includes(expectedSecondParapgraphs),
      );

      expect(bookDescription).toBeInTheDocument();
      expect(bookDescription.textContent).not.toContain(
        expectedThirdParapgraphs,
      );
    });

    test("Then it should show the date started as 'Started: May 10, 2021'", async () => {
      const expectedDate = /started: May 10, 2021/i;

      render(
        <ContextProvider initialEntries={[`/book/${narutoId}`]}>
          <Routes>
            <Route path="/book/:bookId" element={<BookDetailPage />} />
          </Routes>
        </ContextProvider>,
      );

      const bookDate = await screen.findByText(expectedDate);

      expect(bookDate).toBeInTheDocument();
    });

    describe("And the user clicks in View more button", () => {
      test("Then it should show the full 3 parapgraphs description of Naruto Vol. 1", async () => {
        const expectedButtonLabel = /view more/i;
        const expectedFirstParapgraphs =
          "Naruto Uzumaki dreams of becoming the greatest ninja in the village, but he harbors a powerful secret.";
        const expectedSecondParapgraphs =
          "Shunned by the villagers for the demon fox sealed within him, Naruto acts out in a desperate bid for attention and recognition. Yet despite his loneliness, he never gives up on his dream to earn the respect of everyone around him.";
        const expectedThirdParapgraphs =
          "When he joins the ninja academy and is placed on a team with the brooding Sasuke and the sharp-tongued Sakura under their teacher Kakashi, Naruto begins to learn the value of teamwork, perseverance, and loyalty in a world where danger lurks behind every mission.";

        render(
          <ContextProvider initialEntries={[`/book/${narutoId}`]}>
            <Routes>
              <Route path="/book/:bookId" element={<BookDetailPage />} />
            </Routes>
          </ContextProvider>,
        );

        const button = await screen.findByRole("button", {
          name: expectedButtonLabel,
        });

        await user.click(button);

        const bookDescription = await screen.findByText(
          (text) =>
            text.includes(expectedFirstParapgraphs) &&
            text.includes(expectedSecondParapgraphs) &&
            text.includes(expectedThirdParapgraphs),
        );

        expect(bookDescription).toBeInTheDocument();
      });

      test("Then it should show a View less button", async () => {
        const expectedButtonLabel = /view more/i;

        render(
          <ContextProvider initialEntries={[`/book/${narutoId}`]}>
            <Routes>
              <Route path="/book/:bookId" element={<BookDetailPage />} />
            </Routes>
          </ContextProvider>,
        );

        const button = await screen.findByRole("button", {
          name: expectedButtonLabel,
        });

        expect(button).toBeInTheDocument();
      });
    });
  });
});
