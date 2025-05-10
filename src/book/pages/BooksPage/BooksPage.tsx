import type React from "react";
import { useEffect } from "react";
import useBooks from "../../hooks/useBooks";
import "./BooksPage.css";
import { useSearchParams } from "react-router";

const BooksPage: React.FC = () => {
  const { loadBooks, books } = useBooks();
  const { books: pageBooks, totals } = books;

  const [page] = useSearchParams();
  const pageNumber = page.get("page") ? Number(page.get("page")) : 1;

  useEffect(() => {
    loadBooks(pageNumber);
  }, [loadBooks, pageNumber]);

  return (
    <>
      <header className="page-header">
        <h2 className="page-header__title">Bookshelf</h2>
        <span className="page-header__counter">
          {pageBooks.length} / {totals.books} books - Read: {totals.booksRead} -
          To read: {totals.booksToRead}
        </span>
      </header>
      <ul className="posts">
        {pageBooks.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </>
  );
};

export default BooksPage;
