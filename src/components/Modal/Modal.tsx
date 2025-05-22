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
      <div className={`modal__content${errorClass}`}>
        <span className="modal__text">{text}</span>
        <button className="modal__close" onClick={action}>
          <img
            src="/Remove-Bold.svg"
            alt="close modal"
            width={15}
            height={15}
            className={iconErrorClass}
          />
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
