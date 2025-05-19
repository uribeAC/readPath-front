import type React from "react";
import { useEffect } from "react";
import useBooks from "../../hooks/useBooks";
import "./BooksPage.css";
import { useSearchParams } from "react-router";
import Bookshelf from "../../components/Bookshelf/Bookshelf";
import Pagination from "../../../components/Pagination/Pagination";
import Loading from "../../../components/Loading/Loading";
import useLoading from "../../../hooks/useLoading";

const BooksPage: React.FC = () => {
  const { loadBooks, books } = useBooks();
  const {
    loading: { isLoading },
  } = useLoading();
  const { books: pageBooks, totals } = books;

  const [page] = useSearchParams();
  const pageNumber = page.get("page") ? Number(page.get("page")) : 1;

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
          <span className="page-header__counter">
            {pageBooks.length} / {totals.books} books - Read: {totals.booksRead}{" "}
            - To read: {totals.booksToRead}
          </span>
        </header>
        <Bookshelf books={pageBooks} />
        <Pagination currentPage={pageNumber} booksTotal={totals.books} />
      </main>
    );
  }

  return <></>;
};

export default BooksPage;
