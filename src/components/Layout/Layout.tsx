import type React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import "./Layout.css";

const Layout: React.FC = () => {
  return (
    <div className="main-container">
      <Header />
      <Navigation />
    </div>
  );
};

export default Layout;
