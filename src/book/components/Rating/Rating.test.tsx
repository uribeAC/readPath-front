import { render, screen } from "@testing-library/react";
import Rating from "./Rating";

describe("Given the Rating component", () => {
  describe("When it receives a 4 star rating", () => {
    test("Then it should show 4 positive rating stars and 1 empty rating star", () => {
      const rating = 4;
      const expectedPositiveStarAlt = /positive rating star/i;
      const expectedEmptyStarAlt = /empty rating star/i;

      render(<Rating rating={rating} />);

      const positiveStars = screen.getAllByAltText(expectedPositiveStarAlt);
      const emptyStars = screen.getAllByAltText(expectedEmptyStarAlt);

      expect(positiveStars.length).toBe(4);
      expect(emptyStars.length).toBe(1);
    });

    test("Then it should show a 4 star rating", () => {
      const rating = 4;
      const expectedLabel = /4 star rating/i;

      render(<Rating rating={rating} />);

      const ratingStars = screen.getByLabelText(expectedLabel);

      expect(ratingStars).toBeInTheDocument();
    });
  });
});
