import React from "react";
import { Route, Routes } from "react-router";
import BooksPage from "../book/pages/BooksPage/BooksPage";
import AddBookPage from "../book/pages/AddBookPage/AddBookPage";
import BookDetailPage from "../book/pages/BookDetailPage/BookDetailPage";

const AppTestRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/books" element={<BooksPage />} />
      <Route path="/add-book" element={<AddBookPage />} />
      <Route path="/book/:bookId" element={<BookDetailPage />} />
    </Routes>
  );
};

export default AppTestRouter;
