import type React from "react";
import { Outlet } from "react-router";
import Modal from "../Modal/Modal";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import useModal from "../../hooks/useModal";
import "./Layout.css";

const Layout: React.FC = () => {
  const {
    modal: { isError, isModalActive, modalText },
    hideModal,
  } = useModal();

  return (
    <div className="main-container">
      <Header />
      <Navigation />
      <main className={"page-container"}>
        <Outlet />
      </main>
      {isModalActive && (
        <Modal action={hideModal} isError={isError} text={modalText} />
      )}
    </div>
  );
};

export default Layout;
