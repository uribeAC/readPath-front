import {
  transformBookDtoToBook,
  transformBooksInfoDtoToBooksInfo,
} from "../dto/transformers";
import type { Book } from "../types";
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
}

export default BookClient;
