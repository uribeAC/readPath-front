import type { BookDto } from "../dto/types";
import type { Book } from "../types";

export interface BookClientStructure {
  getBooks: (pageNumber?: number) => Promise<BooksInfo>;
}

export type BooksInfo = {
  books: Book[];
  totals: {
    books: number;
    booksRead: number;
    booksToRead: number;
  };
};

export type BooksInfoDto = Omit<BooksInfo, "books"> & {
  books: BookDto[];
};
