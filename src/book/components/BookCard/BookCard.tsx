import type React from "react";
import type { Book } from "../../types";
import Button from "../../../components/Button/Button.tsx";
import Rating from "../Rating/Rating.tsx";
import "./BookCard.css";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({
  book: {
    title,
    author,
    pages,
    firstPublished,
    coverImageUrlSmall,
    imageAlt,
    state,
    yourRating,
  },
}) => {
  const isRead = state === "read";
  const isToRead = state === "to read";

  return (
    <article className="book">
      <img src={coverImageUrlSmall} alt={imageAlt} width={86.32} height={130} />
      <div className="book__data">
        <div className="book__info">
          <h3 className="book__title">{title}</h3>
          <span className="book__author">By {author}</span>
          <span className="book__info-text">{pages} pages</span>
          <span className="book__info-text">
            First published {firstPublished}
          </span>
        </div>
        <footer className="book__footer">
          <div className="book__state">
            <Button action={() => {}} isSelected={isRead}>
              read
            </Button>
            <Button action={() => {}} isSelected={isToRead}>
              to read
            </Button>
          </div>
          {yourRating && <Rating rating={yourRating} />}
        </footer>
      </div>
    </article>
  );
};

export default BookCard;
