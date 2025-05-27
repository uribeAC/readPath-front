import type React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useBooks from "../../hooks/useBooks";
import useLoading from "../../../ui/hooks/useLoading";
import Bookshelf from "../../components/Bookshelf/Bookshelf";
import Pagination from "../../../ui/components/Pagination/Pagination";
import Loading from "../../../ui/components/Loading/Loading";
import BookFilter from "../../components/BookFilter/BookFilter";
import "./BooksPage.css";
import "../styles/pages.css";

const BooksPage: React.FC = () => {
  const { loadBooks, books } = useBooks();
  const {
    loading: { isLoading },
  } = useLoading();
  const { books: pageBooks, totals } = books;

  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const toogleFilter = () => {
    setIsFilter((isFilter) => !isFilter);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });

    loadBooks();
  }, [loadBooks]);

  if (isLoading) {
    return <Loading />;
  }

  if (pageBooks.length > 0) {
    return (
      <main className="page-container">
        <header className="page-header">
          <h2 className="page-title">Bookshelf</h2>
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
        <div className="page-header__subtitle">
          <span className="page-header__counter">
            {pageBooks.length} / {totals.books} books - Read: {totals.booksRead}{" "}
            - To read: {totals.booksToRead}
          </span>
          <button className="page-header__filter" onClick={toogleFilter}>
            Add filter
          </button>
        </div>
        {isFilter && <BookFilter />}
      </header>
    </main>
  );
};

export default BooksPage;
