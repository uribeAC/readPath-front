import { Route, Routes } from "react-router";
import App from "../components/App/App";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
