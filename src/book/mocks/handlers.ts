import { http, HttpResponse } from "msw";
import {
  demonSlayerVol1,
  dragonBallModifiedDto,
  dragonBallReadDto,
  dragonBallToReadDto,
  mangaFixtures,
  narutoVol1,
  onePieceVol1,
  tokyoGhoulVol1,
  vinlandSagaVol1,
} from "../fixtures/fixturesDto";
import type { BooksInfoDto } from "../client/types";
import {
  dragonBallRead,
  dragonBallToRead,
  mangaStats,
} from "../fixtures/fixtures";
import type { BookDto } from "../dto/types";
import type { BookStats } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Not found URL");
}

export const handlers = [
  http.get(`${apiUrl}/books`, ({ request }) => {
    const url = new URL(request.url);
    const currentPage = url.searchParams.get("page");
    const currentGenre = url.searchParams.get("genre");

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

    if (currentGenre === "Horror") {
      return HttpResponse.json<BooksInfoDto>({
        books: [tokyoGhoulVol1],
        totals: {
          books: 1,
          booksRead: 0,
          booksToRead: 1,
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

  http.get(`${apiUrl}/books/${narutoVol1._id}`, () => {
    return HttpResponse.json<{ book: BookDto }>({
      book: narutoVol1,
    });
  }),

  http.get(`${apiUrl}/books/${dragonBallReadDto._id}`, () => {
    return HttpResponse.json<{ book: BookDto }>({
      book: dragonBallReadDto,
    });
  }),

  http.get(`${apiUrl}/books/${onePieceVol1._id}`, () => {
    return HttpResponse.json<{ book: BookDto }>({
      book: onePieceVol1,
    });
  }),

  http.get(`${apiUrl}/books/${demonSlayerVol1._id}`, () => {
    return HttpResponse.json<{ book: BookDto }>({
      book: demonSlayerVol1,
    });
  }),

  http.get(`${apiUrl}/books/stats`, () => {
    return HttpResponse.json<BookStats>(mangaStats);
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

  http.delete(`${apiUrl}/books/${narutoVol1._id}`, () => {
    return HttpResponse.json<{ book: BookDto }>({
      book: narutoVol1,
    });
  }),

  http.delete(`${apiUrl}/books/${vinlandSagaVol1._id}`, () => {
    return HttpResponse.json<{ book: BookDto }>({
      book: vinlandSagaVol1,
    });
  }),

  http.put(`${apiUrl}/books/${dragonBallReadDto._id}`, () => {
    return HttpResponse.json<{ book: BookDto }>({
      book: dragonBallModifiedDto,
    });
  }),
];
