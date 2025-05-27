import type React from "react";
import { NavLink, useLocation } from "react-router";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const { pathname } = useLocation();
  const bookshelfPath = "/books";
  const formPath = "/add-book";
  const bookshelfStatsPath = "/book-stats";

  const bookshelfImageUrl =
    pathname === bookshelfPath ? "/Open-book-bold.svg" : "/Open-book-thin.svg";
  const formImageUrl =
    pathname === formPath ? "/Paper-Write-bold.svg" : "/Paper-Write-thin.svg";
  const statsImageUrl =
    pathname === bookshelfStatsPath ? "/stats-bold.svg" : "/stats-thin.svg";

  return (
    <nav className="navigation">
      <NavLink className="navigation__link" to={bookshelfPath}>
        <img
          src={bookshelfImageUrl}
          alt=""
          height={40}
          width={40}
          aria-hidden
        />
        <span className="navigation__text">Bookshelf</span>
      </NavLink>
      <NavLink className="navigation__link" to={formPath}>
        <img src={formImageUrl} alt="" height={40} width={40} aria-hidden />
        <span className="navigation__text">Add book</span>
      </NavLink>
      <NavLink className="navigation__link" to={bookshelfStatsPath}>
        <img src={statsImageUrl} alt="" height={40} width={40} aria-hidden />
        <span className="navigation__text">Book stats</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
