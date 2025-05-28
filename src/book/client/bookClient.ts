import {
  transformBookDtoToBook,
  transformBooksInfoDtoToBooksInfo,
} from "../dto/transformers";
import type { BookDto } from "../dto/types";
import type { Book, BookSendData, BookStats } from "../types";
import type {
  BookClientStructure,
  BooksInfo,
  BooksInfoDto,
  ResponseBookDto,
} from "./types";

class BookClient implements BookClientStructure {
  private readonly apiUrl = import.meta.env.VITE_API_URL;

  public getBooks = async (
    pageNumber: number,
    state: string,
    genre: string,
  ): Promise<BooksInfo> => {
    const fetchUrl = new URL(`${this.apiUrl}/books`);

    if (pageNumber) {
      fetchUrl.searchParams.set("page", pageNumber.toString());
    }

    if (state) {
      fetchUrl.searchParams.set("state", state);
    }

    if (genre) {
      fetchUrl.searchParams.set("genre", genre);
    }

    const response = await fetch(fetchUrl.toString());

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

  public getBookshelfStats = async (): Promise<BookStats> => {
    const fetchUrl = `${this.apiUrl}/books/stats`;

    const response = await fetch(fetchUrl);

    if (!response.ok) {
      throw new Error("Error fetching bookshelf stats");
    }

    const bookshelfStats = (await response.json()) as BookStats;

    return bookshelfStats;
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

    if (response.status === 409) {
      throw new Error("Book already exists");
    }

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

  public modifyBook = async (
    bookId: string,
    bookData: BookSendData,
  ): Promise<Book> => {
    const fetchUrl = `${this.apiUrl}/books/${bookId}`;
    const book: BookDto = {
      ...bookData,
      _id: bookId,
    };

    const response = await fetch(fetchUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book: book }),
    });

    if (!response.ok) {
      throw new Error("Error modifying book");
    }

    const { book: modifiedBookDto } =
      (await response.json()) as ResponseBookDto;

    const modifiedBook = transformBookDtoToBook(modifiedBookDto);

    return modifiedBook;
  };
}

export default BookClient;
