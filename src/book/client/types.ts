import type { BookDto } from "../dto/types";
import type { Book, BookSendData } from "../types";

export interface BookClientStructure {
  getBooks: (pageNumber?: number) => Promise<BooksInfo>;
  changeBookState: (
    actionState: "read" | "toread",
    bookId: string,
  ) => Promise<Book>;
  addBook: (bookData: BookSendData) => Promise<Book>;
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

export type ResponseBookDto = {
  book: BookDto;
};
