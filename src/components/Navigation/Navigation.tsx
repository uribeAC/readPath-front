import type React from "react";
import { NavLink, useLocation } from "react-router";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const { pathname } = useLocation();
  const bookshelfPath = "/";

  const imageUrl =
    pathname === bookshelfPath ? "/Open-book-bold.svg" : "/Open-book-thin.svg";

  return (
    <nav className="navigation">
      <NavLink className="navigation__link" to="/" aria-label="Bookshelf">
        <img src={imageUrl} alt="Icon of an open book" height={40} width={40} />
        <span className="navigation__text">Bookshelf</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
