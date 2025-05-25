import type React from "react";
import "./Loading.css";

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <h2 className="loading__text loading__text--animation">
        Loading information . . .
      </h2>
      <img
        src="/loading-icon.webp"
        alt="Women on top of a flying book"
        width={500}
        height={500}
        className="loading__image"
      />
      <span className="loading__text loading__text--underline">
        Your bookshelf is getting sorted.
      </span>
    </div>
  );
};

export default Loading;
