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
      <img
        src="https://i.ibb.co/ycxKm5GY/lifesteal-195.webp"
        alt="{imageAlt}"
        width={86}
        height={130}
        loading="eager"
        fetchPriority="high"
      />
      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
