import type React from "react";
import { Link } from "react-router";
import useFilter from "../../hooks/useFilter";
import "./Pagination.css";

interface PaginationProps {
  booksTotal: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ booksTotal, currentPage }) => {
  const { filter } = useFilter();
  const origin = window.location.origin;

  const pagesTotal = Math.ceil(booksTotal / 10);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const hiddenClass = " paginator__link--hidden";
  const firstPageClass = currentPage > 1 ? "" : hiddenClass;
  const lastPageClass = currentPage < pagesTotal ? "" : hiddenClass;

  const previousUrl = new URL(`${origin}/books?page=${previousPage}`);
  const nextUrl = new URL(`${origin}/books?page=${nextPage}`);

  if (filter.state !== "All") {
    previousUrl.searchParams.set("state", filter.state);
    nextUrl.searchParams.set("state", filter.state);
  }

  if (filter.genre !== "All") {
    previousUrl.searchParams.set("genre", filter.genre);
    nextUrl.searchParams.set("genre", filter.genre);
  }

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
