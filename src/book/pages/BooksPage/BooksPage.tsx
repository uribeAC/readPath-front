import type React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useBooks from "../../hooks/useBooks";
import useLoading from "../../../hooks/useLoading";
import Bookshelf from "../../components/Bookshelf/Bookshelf";
import Pagination from "../../../components/Pagination/Pagination";
import Loading from "../../../components/Loading/Loading";
import "./BooksPage.css";
import BookFilter from "../../components/BookFilter/BookFilter";

const BooksPage: React.FC = () => {
  const { loadBooks, books } = useBooks();
  const {
    loading: { isLoading },
  } = useLoading();
  const { books: pageBooks, totals } = books;

  const [page] = useSearchParams();
  const pageNumber = page.get("page") ? Number(page.get("page")) : 1;

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const toogleFilter = () => {
    setIsFilter((isFilter) => !isFilter);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });

    loadBooks(pageNumber);
  }, [loadBooks, pageNumber]);

  if (isLoading) {
    return <Loading />;
  }

  if (pageBooks.length > 0) {
    return (
      <main className="page-container">
        <header className="page-header">
          <h2 className="page-header__title">Bookshelf</h2>
          <div className="page-header__subtitle">
            <span className="page-header__counter">
              {pageBooks.length} / {totals.books} books - Read:{" "}
              {totals.booksRead} - To read: {totals.booksToRead}
            </span>
            <button className="page-header__filter" onClick={toogleFilter}>
              Add filter
            </button>
          </div>
          {isFilter && <BookFilter />}
        </header>
        <Bookshelf books={pageBooks} />
        <Pagination currentPage={pageNumber} booksTotal={totals.books} />
      </main>
    );
  }

  return (
    <main className="page-container">
      <header className="page-header">
        <h2 className="page-header__title">Bookshelf</h2>
        <span className="page-header__counter">
          {pageBooks.length} / {totals.books} books - Read: {totals.booksRead} -
          To read: {totals.booksToRead}
        </span>
      </header>
    </main>
  );
};

export default BooksPage;
