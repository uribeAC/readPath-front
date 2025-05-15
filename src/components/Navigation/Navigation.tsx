import type React from "react";
import { NavLink, useLocation } from "react-router";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const { pathname } = useLocation();
  const bookshelfPath = "/books";
  const formPath = "/add-book";

  const bookshelfImageUrl =
    pathname === bookshelfPath ? "/Open-book-bold.svg" : "/Open-book-thin.svg";
  const formImageUrl =
    pathname === formPath ? "/Paper-Write-bold.svg" : "/Paper-Write-thin.svg";

  return (
    <nav className="navigation">
      <NavLink
        className="navigation__link"
        to={bookshelfPath}
        aria-label="Bookshelf"
      >
        <img
          src={bookshelfImageUrl}
          alt="Icon of an open book"
          height={40}
          width={40}
        />
        <span className="navigation__text">Bookshelf</span>
      </NavLink>
      <NavLink className="navigation__link" to={formPath} aria-label="Add book">
        <img
          src={formImageUrl}
          alt="Icon of writting a book"
          height={40}
          width={40}
        />
        <span className="navigation__text">Add book</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
