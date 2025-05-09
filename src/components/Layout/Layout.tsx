import type React from "react";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import "./Layout.css";

const Layout: React.FC = () => {
  return (
    <div className="main-container">
      <Header />
      <Navigation />
      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
