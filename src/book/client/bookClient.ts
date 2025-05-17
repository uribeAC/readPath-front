import {
  transformBookDtoToBook,
  transformBooksInfoDtoToBooksInfo,
} from "../dto/transformers";
import type { Book, BookSendData } from "../types";
import type {
  BookClientStructure,
  BooksInfo,
  BooksInfoDto,
  ResponseBookDto,
} from "./types";

class BookClient implements BookClientStructure {
  private readonly apiUrl = import.meta.env.VITE_API_URL;

  public getBooks = async (pageNumber?: number): Promise<BooksInfo> => {
    const fetchUrl = !pageNumber
      ? `${this.apiUrl}/books`
      : `${this.apiUrl}/books?page=${pageNumber}`;

    const response = await fetch(fetchUrl);

    if (!response.ok) {
      throw new Error("Error fetching books");
    }

    const booksInfoDto = (await response.json()) as BooksInfoDto;

    const booksInfo = transformBooksInfoDtoToBooksInfo(booksInfoDto);

    return booksInfo;
  };

  public getBookById = async (bookId: string): Promise<Book> => {
    const fetchUrl = `${this.apiUrl}/books/${bookId}`;

    const response = await fetch(fetchUrl);

    if (!response.ok) {
      throw new Error("Error fetching book");
    }

    const { book: bookDto } = (await response.json()) as ResponseBookDto;

    const book = transformBookDtoToBook(bookDto);

    return book;
  };

  public changeBookState = async (
    actionState: "read" | "toread",
    bookId: string,
  ): Promise<Book> => {
    const fetchUrl = `${this.apiUrl}/books/mark-as-${actionState}/${bookId}`;

    const response = await fetch(fetchUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error marking book as ${actionState}`);
    }

    const { book } = (await response.json()) as ResponseBookDto;

    const updatedBook = transformBookDtoToBook(book);

    return updatedBook;
  };

  public addBook = async (bookData: BookSendData): Promise<Book> => {
    const response = await fetch(`${this.apiUrl}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book: bookData }),
    });

    if (!response.ok) {
      throw new Error("Error adding new book");
    }

    const { book: newBookDto } = (await response.json()) as ResponseBookDto;

    const newBook = transformBookDtoToBook(newBookDto);

    return newBook;
  };

  public deleteBook = async (bookId: string): Promise<Book> => {
    const fetchUrl = `${this.apiUrl}/books/${bookId}`;

    const response = await fetch(fetchUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Error deleting book");
    }

    const { book: deletedBookDto } = (await response.json()) as ResponseBookDto;

    const deletedBook = transformBookDtoToBook(deletedBookDto);

    return deletedBook;
  };
}

export default BookClient;
