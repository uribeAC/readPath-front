import { Navigate, Route, Routes } from "react-router";
import App from "../components/App/App";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import BooksPage from "../book/pages/BooksPage/BooksPage";
import AddBookPage from "../book/pages/AddBookPage/AddBookPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/books" />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="add-book" element={<AddBookPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
