import type React from "react";
import "./Modal.css";

interface ModalProps {
  action: () => void;
  isError: boolean;
  text: string;
}

const Modal: React.FC<ModalProps> = ({ action, text, isError }) => {
  const errorClass = isError ? " modal__content--error" : "";
  const iconErrorClass = isError ? "modal__icon--error" : "";

  return (
    <dialog open className="modal">
      <button
        className="modal__background-button"
        onClick={action}
        aria-label="cerrar modal"
      />
      <main className={`modal__content${errorClass}`}>
        <h2 className="modal__text">{text}</h2>
        <button className="modal__close">
          <img
            src="/Remove-Bold.svg"
            alt="close modal"
            width={15}
            height={15}
            className={iconErrorClass}
          />
        </button>
      </main>
    </dialog>
  );
};

export default Modal;
