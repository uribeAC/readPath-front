import { http, HttpResponse } from "msw";
import {
  dragonBallReadDto,
  dragonBallToReadDto,
  mangaFixtures,
  narutoVol1,
  onePieceVol1,
} from "../fixtures/fixturesDto";
import type { BooksInfoDto } from "../client/types";
import { dragonBallRead, dragonBallToRead } from "../fixtures/fixtures";
import type { BookDto } from "../dto/types";

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

  http.patch(`${apiUrl}/books/mark-as-read/${dragonBallToRead.id}`, () => {
    return HttpResponse.json<{ book: BookDto }>({ book: dragonBallReadDto });
  }),

  http.patch(`${apiUrl}/books/mark-as-toread/${dragonBallRead.id}`, () => {
    return HttpResponse.json<{ book: BookDto }>({ book: dragonBallToReadDto });
  }),

  http.patch(`${apiUrl}/books/mark-as-toread/${narutoVol1._id}`, () => {
    return HttpResponse.json<{ book: BookDto }>({
      book: { ...narutoVol1, state: "to read" },
    });
  }),

  http.patch(`${apiUrl}/books/mark-as-read/${onePieceVol1._id}`, () => {
    return HttpResponse.json<{ book: BookDto }>({
      book: { ...onePieceVol1, state: "read" },
    });
  }),

  http.post(`${apiUrl}/books`, () => {
    return HttpResponse.json<{ book: BookDto }>({
      book: dragonBallReadDto,
    });
  }),
];
