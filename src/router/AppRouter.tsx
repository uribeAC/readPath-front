import { Navigate, Route, Routes } from "react-router";
import App from "../ui/components/App/App";
import {
  LazyAddBookPage,
  LazyBookDetailPage,
  LazyBooksPage,
  LazyModifyBookPage,
  LazyNotFoundPage,
  LazyStatsPage,
} from "./LazyPages";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/books" />} />
        <Route path="books" element={<LazyBooksPage />} />
        <Route path="add-book" element={<LazyAddBookPage />} />
        <Route path="book/:bookId" element={<LazyBookDetailPage />} />
        <Route path="modify-book/:bookId" element={<LazyModifyBookPage />} />
        <Route path="book-stats" element={<LazyStatsPage />} />
        <Route path="*" element={<LazyNotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
