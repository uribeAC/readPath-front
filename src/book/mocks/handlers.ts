import { http, HttpResponse } from "msw";
import { mangaFixtures } from "../fixtures/fixtures";
import type { BooksInfoDto } from "../client/types";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Not found URL");
}

export const handlers = [
  http.get(`${apiUrl}/books`, ({ request }) => {
    const url = new URL(request.url);
    const currentPage = url.searchParams.get("page");

    if (currentPage === "2") {
      return HttpResponse.json<BooksInfoDto>({
        books: mangaFixtures.slice(10, 20),
        totals: {
          books: 12,
          booksRead: 7,
          booksToRead: 5,
        },
      });
    }

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
