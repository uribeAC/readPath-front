import { Navigate, Route, Routes } from "react-router";
import App from "../components/App/App";
import {
  LazyAddBookPage,
  LazyBookDetailPage,
  LazyBooksPage,
  LazyNotFoundPage,
} from "./components/LazyLoaders";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/books" />} />
        <Route path="books" element={<LazyBooksPage />} />
        <Route path="add-book" element={<LazyAddBookPage />} />
        <Route path="book/:bookId" element={<LazyBookDetailPage />} />
        <Route path="*" element={<LazyNotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
