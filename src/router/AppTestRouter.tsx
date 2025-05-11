import React from "react";
import { Route, Routes } from "react-router";
import BooksPage from "../book/pages/BooksPage/BooksPage";

const AppTestRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/books" element={<BooksPage />} />
    </Routes>
  );
};

export default AppTestRouter;
