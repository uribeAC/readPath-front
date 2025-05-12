import type React from "react";
import { Link } from "react-router";
import "./Pagination.css";

interface PaginationProps {
  booksTotal: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ booksTotal, currentPage }) => {
  const pagesTotal = Math.ceil(booksTotal / 10);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const hiddenClass = " paginator__link--hidden";
  const firstPageClass = currentPage > 1 ? "" : hiddenClass;
  const lastPageClass = currentPage < pagesTotal ? "" : hiddenClass;

  return (
    <nav className="paginator">
      <Link
        className={`paginator__link${firstPageClass}`}
        to={`/books?page=${previousPage}`}
        aria-label="Previous page"
      >
        {"<"}
      </Link>
      <span className="pagintator__current-page">{currentPage}</span>
      <Link
        className={`paginator__link${lastPageClass}`}
        to={`/books?page=${nextPage}`}
        aria-label="Next page"
      >
        {">"}
      </Link>
    </nav>
  );
};

export default Pagination;
