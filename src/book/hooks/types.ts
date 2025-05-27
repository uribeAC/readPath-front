import type { BooksInfo } from "../client/types";
import type { BookSendData, BookStats } from "../types";

export interface BookContext {
  booksState: BooksInfo;
  statsState: BookStats;
  loadBooks: () => Promise<void>;
  loadBookById: (bookId: string) => Promise<void>;
  loadStats: () => Promise<void>;
  updateBook: (actionState: "read" | "toread", bookId: string) => Promise<void>;
  createBook: (bookData: BookSendData) => Promise<void>;
  removeBook: (bookId: string) => Promise<void>;
  editBook: (bookData: BookSendData, bookId: string) => Promise<void>;
}
