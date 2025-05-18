import type React from "react";
import { Outlet, useLocation } from "react-router";
import Modal from "../Modal/Modal";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import useModal from "../../hooks/useModal";
import "./Layout.css";

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const {
    modal: { isError, isModalActive, modalText },
    hideModal,
  } = useModal();

  const detailRegex = /^\/book\//i;
  const isPageDetail = RegExp(detailRegex).test(pathname);
  const detailPageModifier = isPageDetail ? " page-container--detail" : "";

  return (
    <div className="main-container">
      <Header />
      <Navigation />
      <main className={`page-container${detailPageModifier}`}>
        <Outlet />
      </main>
      {isModalActive && (
        <Modal action={hideModal} isError={isError} text={modalText} />
      )}
    </div>
  );
};

export default Layout;
