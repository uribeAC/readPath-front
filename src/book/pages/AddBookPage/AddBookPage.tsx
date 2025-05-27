import React from "react";
import BookForm from "../../components/BookForm/BookForm";
import type { BookFormData } from "../../types";
import useBooks from "../../hooks/useBooks";
import "../styles/pages.css";

const AddBookPage: React.FC = () => {
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    userRating: "",
  };

  return (
    <main className="page-container">
      <header>
        <h2 className="page-title">Add a new book</h2>
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
