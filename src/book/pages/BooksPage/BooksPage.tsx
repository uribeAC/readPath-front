import type React from "react";
import { useEffect } from "react";
import useBooks from "../../hooks/useBooks";
import "./BooksPage.css";
import { useSearchParams } from "react-router";
import Bookshelf from "../../components/Bookshelf/Bookshelf";

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
      <Bookshelf books={pageBooks} />
    </>
  );
};

export default BooksPage;
