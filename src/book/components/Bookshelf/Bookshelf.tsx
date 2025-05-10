import type React from "react";
import type { Book } from "../../types";

interface BookshelfProps {
  books: Book[];
}

const Bookshelf: React.FC<BookshelfProps> = ({ books }) => {
  return (
    <ul className="bookshelf">
      {books.map((book) => (
        <li key={book.id}></li>
      ))}
    </ul>
  );
};

export default Bookshelf;
