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
      <NavLink className="navigation__link" to="/">
        <img src={imageUrl} alt="Go to bookshelf" height={40} width={40} />
        <h2 className="navigation__text">Bookshelf</h2>
      </NavLink>
    </nav>
  );
};

export default Navigation;
