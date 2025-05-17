import type React from "react";
import type { Star, StarsRating } from "../../types";
import "./Rating.css";

interface RatingProps {
  rating: StarsRating;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const ratingStars = [1, 2, 3, 4, 5];

  const imageStars: Star[] = ratingStars.map((rate) => {
    if (rate <= rating) {
      const colorStar: Star = {
        starUrl: "/star-color.svg",
        starAlt: "Positive rating star",
      };

      return colorStar;
    }

    const noColorStar: Star = {
      starUrl: "/star-no-color.svg",
      starAlt: "Empty rating star",
    };

    return noColorStar;
  });

  return (
    <ul className="star-rating" aria-label={`${rating} star rating`}>
      {imageStars.map((imageStar, index) => (
        <li key={ratingStars[index]} className="star">
          <img
            src={imageStar.starUrl}
            alt={imageStar.starAlt}
            width={15}
            height={15}
            aria-hidden={true}
          />
        </li>
      ))}
    </ul>
  );
};

export default Rating;
