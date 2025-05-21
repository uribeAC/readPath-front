import type React from "react";
import BookForm from "../../components/BookForm/BookForm";
import useBooks from "../../hooks/useBooks";
import "./AddBookPage.css";
import type { BookFormData } from "../../types";

const AddBookPage: React.FC = () => {
  const { createBook } = useBooks();
  const initialBookData: BookFormData = {
    title: "",
    author: "",
    description: "",
    saga: "",
    coverImageUrl: "",
    genres: "",
    firstPublished: "",
    pages: 0,
    state: "to read",
    readDates: {
      dateFinished: "",
      dateStarted: "",
      readYear: 0,
    },
    yourRating: "",
  };

  return (
    <main className="page-container">
      <header className="page-header">
        <h2 className="page-header__title">Add a new book</h2>
      </header>
      <BookForm
        createAction={createBook}
        isCreate={true}
        initialBookData={initialBookData}
        initialSelectedGenres={[]}
      />
    </main>
  );
};

export default AddBookPage;
