import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { shonenFixtures } from "../../fixtures/fixtures";
import store from "../../../store/store";
import Bookshelf from "./Bookshelf";

describe("Given the Bookshelf component", () => {
  describe("When it receives Naruto, One Piece and Bleach Vol. 1 books", () => {
    test("Then it should show the titles 'Naruto Vol. 1', 'One Piece Vol. 1' and 'Bleach Vol. 1' inside a heading", () => {
      const expectedNaurtoTitle = /naruto vol. 1/i;
      const expectedOnePieceTitle = /one piece vol. 1/i;
      const expectedBleachTitle = /bleach vol. 1/i;

      render(
        <Provider store={store}>
          <Bookshelf books={shonenFixtures} />,
        </Provider>,
      );

      const narutoTitle = screen.getByRole("heading", {
        name: expectedNaurtoTitle,
      });
      const onePieceTitle = screen.getByRole("heading", {
        name: expectedOnePieceTitle,
      });
      const bleachTitle = screen.getByRole("heading", {
        name: expectedBleachTitle,
      });

      expect(narutoTitle).toBeInTheDocument();
      expect(onePieceTitle).toBeInTheDocument();
      expect(bleachTitle).toBeInTheDocument();
    });
  });
});
