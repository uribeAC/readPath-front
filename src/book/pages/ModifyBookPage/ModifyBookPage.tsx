import { useEffect } from "react";
import { useParams } from "react-router";
import BookForm from "../../components/BookForm/BookForm";
import useBooks from "../../hooks/useBooks";
import { useAppSelector } from "../../../store/hooks";
import type { BookFormData } from "../../types";
import "../styles/pages.css";

const ModifyBookPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { editBook, loadBookById, booksState } = useBooks();

  const hasStateBook = booksState.books.some((book) => book.id === bookId);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (!hasStateBook) {
      loadBookById(bookId!);
    }
  }, [loadBookById, bookId, hasStateBook]);

  const book = useAppSelector((state) =>
    state.books.booksInfo.books.find((book) => book.id === bookId),
  );

  if (book) {
    const formFirstPublished = new Date(book.firstPublished)
      .toISOString()
      .split("T")[0];

    const formStartDate = book.readDates?.dateStarted
      ? new Date(book.readDates.dateStarted).toISOString().split("T")[0]
      : "";

    const formFinishDate = book.readDates?.dateFinished
      ? new Date(book.readDates.dateFinished).toISOString().split("T")[0]
      : "";

    const initialBookData: BookFormData = {
      title: book.title,
      author: book.author,
      description: book.description,
      saga: book.saga ? `${book.saga.name} #${book.saga.bookNumber}` : "",
      genres: book.genres[0],
      pages: book.pages,
      firstPublished: formFirstPublished,
      state: book.state,
      yourRating: book.yourRating?.toString() ?? "",
      readDates: {
        dateStarted: formStartDate,
        dateFinished: formFinishDate,
        readYear: book.readDates?.readYear ?? 0,
      },
      coverImageUrl: book.coverImageUrlBig,
    };

    const initialSelectedGenres: string[] = book.genres;

    return (
      <main className="page-container">
        <header>
          <h2 className="page-title">Modify: {book.title}</h2>
        </header>
        <BookForm
          modifyAction={editBook}
          isCreate={false}
          bookId={bookId}
          initialBookData={initialBookData}
          initialSelectedGenres={initialSelectedGenres}
        />
      </main>
    );
  }

  return (
    <main className="page-container">
      <header className="page-header">
        <h2 className="page-header__title">Modify book: </h2>
      </header>
    </main>
  );
};

export default ModifyBookPage;
