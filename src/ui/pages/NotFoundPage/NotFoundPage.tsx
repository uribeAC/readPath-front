import type React from "react";
import "./NotFoundPage.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <img
        src="/Not-found-page-icon.webp"
        alt="Book with a magnified glass showing a 404"
        height={154}
        width={169.23}
      />
      <h2 className="not-found__title">Page Not Found</h2>
    </div>
  );
};

export default NotFoundPage;
