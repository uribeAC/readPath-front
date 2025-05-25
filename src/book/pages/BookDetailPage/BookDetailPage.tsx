import type React from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Loading from "../../../ui/components/Loading/Loading";
import { transformDescriptionDtoToDescriptionPreview } from "../../dto/transformers";
import { useAppSelector } from "../../../store/hooks";
import Button from "../../../ui/components/Button/Button";
import useLoading from "../../../hooks/useLoading";
import Rating from "../../components/Rating/Rating";
import useBooks from "../../hooks/useBooks";
import "./BookDetailPage.css";

const BookDetailPage: React.FC = () => {
  const { loadBookById, updateBook, books, removeBook } = useBooks();
  const {
    loading: { isLoading },
  } = useLoading();
  const navigate = useNavigate();

  const { bookId } = useParams<{ bookId: string }>();

  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);

  const hasStateBook = books.books.some((book) => book.id === bookId);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (!hasStateBook) {
      loadBookById(bookId!);
    }
  }, [loadBookById, bookId, hasStateBook]);

  const book = useAppSelector((state) =>
    state.books.booksInfo.books.find((book) => book.id === bookId),
  );

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

    const deleteBook = (bookId: string) => {
      navigate("/books");
      removeBook(bookId, 1, "", "");
    };

    return (
      <main className="detail-page-container detail-page-container--background">
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
        <div className="detail-page__buttons">
          <Button
            action={() => deleteBook(bookId!)}
            isDisabled={false}
            isSelected={true}
            classModifierName="detail-delete"
          >
            Delete book
          </Button>
          <Link to={`/modify-book/${id}`} className="book-detail__button">
            Modify book
          </Link>
        </div>
      </main>
    );
  }

  return <></>;
};

export default BookDetailPage;
