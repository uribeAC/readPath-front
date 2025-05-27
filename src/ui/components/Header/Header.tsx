import type React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <h1 className="main-header__title" aria-label="readPath">
        read
        <img
          src="/readPath-logo.webp"
          className="main-header__logo"
          alt=""
          height={38}
          width={38}
          aria-hidden
        />
        Path
      </h1>
    </header>
  );
};

export default Header;
