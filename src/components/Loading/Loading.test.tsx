import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Given the Loading component", () => {
  describe("When it renders", () => {
    test("Then it should show 'Loading information . . .' inside a heading", () => {
      const expectedTitle = /loading information . . ./i;

      render(<Loading />);

      const loadingTitle = screen.getByRole("heading", { name: expectedTitle });

      expect(loadingTitle).toBeInTheDocument();
    });

    test("Then it should show an image of Women on top of a flying book", () => {
      const expectedImageAlt = "Women on top of a flying book";

      render(<Loading />);

      const loadingImage = screen.getByAltText(expectedImageAlt);

      expect(loadingImage).toBeInTheDocument();
    });
  });
});
