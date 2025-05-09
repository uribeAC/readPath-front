import { http, HttpResponse } from "msw";
import { mangaFixtures } from "../fixtures/fixtures";
import type { BooksInfoDto } from "../client/types";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Not found URL");
}

export const handlers = [
  http.get(`${apiUrl}/books`, () => {
    return HttpResponse.json<BooksInfoDto>({
      books: mangaFixtures.slice(0, 10),
      totals: {
        books: 12,
        booksRead: 7,
        booksToRead: 5,
      },
    });
  }),
];
