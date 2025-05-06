import type React from "react";
import "./Layout.css";
import Header from "../Header/Header";

const Layout: React.FC = () => {
  return (
    <div className="main-container">
      <Header />
    </div>
  );
};

export default Layout;
