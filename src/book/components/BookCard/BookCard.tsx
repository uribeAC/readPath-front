import type React from "react";
import type { Book } from "../../types";
import Button from "../../../components/Button/Button.tsx";
import Rating from "../Rating/Rating.tsx";
import "./BookCard.css";
import useBooks from "../../hooks/useBooks.ts";

interface BookCardProps {
  book: Book;
  index: number;
}

const BookCard: React.FC<BookCardProps> = ({
  book: {
    id,
    title,
    author,
    pages,
    firstPublished,
    coverImageUrlSmall,
    imageAlt,
    state,
    yourRating,
  },
  index,
}) => {
  const { updateBook } = useBooks();

  const isRead = state === "read";
  const isToRead = state === "to read";

  const loadingType = index <= 3 ? "eager" : "lazy";
  const priorityType = index <= 3 ? "high" : "low";

  return (
    <article className="book">
      <img
        src={coverImageUrlSmall}
        alt={imageAlt}
        width={86}
        height={130}
        loading={loadingType}
        fetchPriority={priorityType}
      />
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
            <Button action={() => updateBook("read", id)} isSelected={isRead}>
              read
            </Button>
            <Button
              action={() => updateBook("toread", id)}
              isSelected={isToRead}
            >
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
