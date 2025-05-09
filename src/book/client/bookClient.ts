import { transformBooksInfoDtoToBooksInfo } from "../dto/transformers";
import type { BookClientStructure, BooksInfo, BooksInfoDto } from "./types";

class BookClient implements BookClientStructure {
  private apiUrl = import.meta.env.VITE_API_URL;

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
}

export default BookClient;
