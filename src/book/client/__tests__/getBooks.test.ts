import { http, HttpResponse } from "msw";
import { transformBooksDtoToBooks } from "../../dto/transformers";
import { mangaFixtures } from "../../fixtures/fixturesDto";
import { server } from "../../mocks/node";
import BookClient from "../bookClient";

describe("Given the getBooks method of bookClient", () => {
  describe("When it's called", () => {
    test("Then it should return 10 books being the first Naruto Vol. 1 and the last Spy x Family Vol. 1", async () => {
      const expectedBooks = transformBooksDtoToBooks(
        mangaFixtures.slice(0, 10),
      );
      const bookClient = new BookClient();

      const { books } = await bookClient.getBooks();

      expect(books.at(0)!.title).toBe("Naruto Vol. 1");

      expect(books).toStrictEqual(expectedBooks);

      expect(books.at(-1)!.title).toBe("Spy x Family Vol. 1");
    });

    test("Then it should return 12 as the total number of books with 7 read and 5 to read", async () => {
      const bookClient = new BookClient();

      const { totals: booksTotals } = await bookClient.getBooks();

      expect(booksTotals.books).toBe(12);
      expect(booksTotals.booksRead).toBe(7);
      expect(booksTotals.booksToRead).toBe(5);
    });
  });

  describe("When it's called and response is not ok", () => {
    test("Then it should throw 'Error fetching books'", async () => {
      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.get(`${apiUrl}/books`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const bookClient = new BookClient();

      const books = bookClient.getBooks();

      await expect(books).rejects.toThrow("Error fetching books");
    });
  });
});
