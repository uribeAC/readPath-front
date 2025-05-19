import type React from "react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import { transformDescriptionDtoToDescriptionPreview } from "../../dto/transformers";
import Button from "../../../components/Button/Button";
import useLoading from "../../../hooks/useLoading";
import Rating from "../../components/Rating/Rating";
import useBooks from "../../hooks/useBooks";
import "./BookDetailPage.css";

const BookDetailPage: React.FC = () => {
  const { loadBookById, books, updateBook } = useBooks();
  const {
    loading: { isLoading },
  } = useLoading();
  const { books: loadBooks } = books;

  const { bookId } = useParams<{ bookId: string }>();

  const book = loadBooks[0];

  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    loadBookById(bookId!);
  }, [loadBookById, bookId]);

  if (isLoading) {
    return <Loading />;
  }

  if (book) {
    const {
      author,
      title,
      saga,
      description,
      pages,
      firstPublished,
      genres,
      state,
      yourRating,
      id,
      readDates,
      coverImageUrlBig,
      imageAlt,
    } = book;

    const previewDescription =
      transformDescriptionDtoToDescriptionPreview(description);

    const isRead = state === "read";
    const isToRead = state === "to read";
    const hasReadDates = readDates?.dateFinished ?? readDates?.dateStarted;

    const toogleDescription = () => {
      setIsDescriptionExpanded(
        (isDescriptionExpanded) => !isDescriptionExpanded,
      );
    };

    const descriptionView = isDescriptionExpanded ? "View less" : "View more";
    const showDescription = isDescriptionExpanded
      ? description
      : previewDescription;

    const isLongDescription = description !== previewDescription;

    return (
      <main className="page-container page-container--background">
        <article className="book-detail">
          <img
            className="book-detail__cover"
            src={coverImageUrlBig}
            alt={imageAlt}
            width={160}
            height={247}
            fetchPriority="high"
          />
          <div className="book-detail__group book-detail__group--first">
            <h2 className="book-detail__title">{title}</h2>
            {saga && (
              <span className="book-detail__text">
                {saga.name} #{saga.bookNumber}
              </span>
            )}
            <span className="book-detail_author">By {author}</span>
          </div>
          <div className="book-detail__group">
            <h3 className="book-detail__group-title">Book description</h3>
            <p className="book-detail__text book-detail__text--description">
              {showDescription}
            </p>
            {isLongDescription && (
              <button
                className="book-detail__text book-detail__text--button"
                onClick={toogleDescription}
              >
                {descriptionView}
              </button>
            )}
          </div>
          <div className="book-detail__group">
            <span className="book-detail__text">{pages} pages</span>
            <span className="book-detail__text">{firstPublished}</span>
            <ul className="book-detail__genres">
              {genres.map((genre) => (
                <li className="book-detail__text" key={genre}>
                  #{genre}
                </li>
              ))}
            </ul>
          </div>
          <div className="book-detail__group book-detail__group--last">
            <div className="book-detail__state">
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
            {hasReadDates && (
              <div className="book-detail__dates">
                Dates read:
                {readDates?.dateStarted && (
                  <span>Started: {readDates.dateStarted}</span>
                )}
                {readDates?.dateFinished && (
                  <span>Finished: {readDates.dateFinished}</span>
                )}
              </div>
            )}
          </div>
        </article>
      </main>
    );
  }

  return <></>;
};

export default BookDetailPage;
