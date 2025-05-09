import type React from "react";
import type { Book } from "../../types";
import BookCard from "../BookCard/BookCard";
import "./Bookshelf.css";

interface BookshelfProps {
  books: Book[];
}

const Bookshelf: React.FC<BookshelfProps> = ({ books }) => {
  return (
    <ul className="bookshelf">
      {books.map((book) => (
        <li key={book.id}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
};

export default Bookshelf;
