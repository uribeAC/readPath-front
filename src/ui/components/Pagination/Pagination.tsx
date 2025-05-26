import type React from "react";
import { Link } from "react-router";
import useSearch from "../../../hooks/useSearch";
import "./Pagination.css";

interface PaginationProps {
  booksTotal: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ booksTotal, currentPage }) => {
  const { getUrl } = useSearch();

  const pagesTotal = Math.ceil(booksTotal / 10);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const hiddenClass = " paginator__link--hidden";
  const firstPageClass = currentPage > 1 ? "" : hiddenClass;
  const lastPageClass = currentPage < pagesTotal ? "" : hiddenClass;

  const previousUrl = getUrl(previousPage);
  const nextUrl = getUrl(nextPage);

  return (
    <nav className="paginator">
      <Link
        className={`paginator__link${firstPageClass}`}
        to={previousUrl.toString()}
        aria-label="Previous page"
      >
        {"<"}
      </Link>
      <span className="pagintator__current-page">{currentPage}</span>
      <Link
        className={`paginator__link${lastPageClass}`}
        to={nextUrl.toString()}
        aria-label="Next page"
      >
        {">"}
      </Link>
    </nav>
  );
};

export default Pagination;
