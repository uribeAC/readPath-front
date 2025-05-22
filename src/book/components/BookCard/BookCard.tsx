import type React from "react";
import { Link, useSearchParams } from "react-router";
import type { Book, BookFilters } from "../../types";
import Button from "../../../components/Button/Button.tsx";
import useBooks from "../../hooks/useBooks.ts";
import Rating from "../Rating/Rating.tsx";
import "./BookCard.css";
import { useMemo } from "react";

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
  const { updateBook, removeBook } = useBooks();

  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const filters: BookFilters = useMemo(() => {
    const booksFilter: BookFilters = {};

    const state = searchParams.get("state");
    const genre = searchParams.get("genre");

    if (state) booksFilter.state = state;
    if (genre) booksFilter.genre = genre;

    return booksFilter;
  }, [searchParams]);

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
      <div className="book__display">
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
              <Button
                action={() => updateBook("read", id)}
                isSelected={isRead}
                isDisabled={isRead}
              >
                read
              </Button>
              <Button
                action={() => updateBook("toread", id)}
                isSelected={isToRead}
                isDisabled={isToRead}
              >
                to read
              </Button>
            </div>
            {yourRating && <Rating rating={yourRating} />}
          </footer>
        </div>
        <div className="book__buttons">
          <button
            onClick={() =>
              removeBook(id, pageNumber, filters.state!, filters.genre!)
            }
            className="book__button"
          >
            <img
              src="/Remove-Bold.svg"
              alt="delete book"
              width={24}
              height={24}
              className="book__icon"
            />
          </button>
          <Link to={`/modify-book/${id}`} className="book__button">
            <img
              src="/Pencil.svg"
              alt="modify book"
              width={24}
              height={24}
              className="book__icon"
            />
          </Link>
          <Link to={`/book/${id}`} className="book__button">
            <img
              src="/Information.svg"
              alt="see book details"
              width={24}
              height={24}
              className="book__icon"
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
