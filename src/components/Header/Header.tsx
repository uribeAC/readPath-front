import type React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <h1 className="main-header__title" aria-label="readPath">
        read
        <img
          src="/readPath-logo.svg"
          alt="logo with an open book and a path between the pages"
          className="main-header__logo"
          height={38}
          width={38}
        />
        Path
      </h1>
    </header>
  );
};

export default Header;
