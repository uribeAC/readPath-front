import type React from "react";
import BookForm from "../../components/BookForm/BookForm";
import useBooks from "../../hooks/useBooks";
import "./AddBookPage.css";

const AddBookPage: React.FC = () => {
  const { createBook } = useBooks();

  return (
    <main className="page-container">
      <header className="page-header">
        <h2 className="page-header__title">Add a new book</h2>
      </header>
      <BookForm action={createBook} />
    </main>
  );
};

export default AddBookPage;
