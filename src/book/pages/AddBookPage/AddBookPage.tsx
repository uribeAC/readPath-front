import type React from "react";
import BookForm from "../../components/BookForm/BookForm";

const AddBookPage: React.FC = () => {
  return (
    <>
      <header className="page-header">
        <h2 className="page-header__title">Add a new book</h2>
      </header>
      <BookForm />
    </>
  );
};

export default AddBookPage;
