import { http, HttpResponse } from "msw";
import { server } from "../../mocks/node";
import { mangaStats } from "../../fixtures/fixtures";
import BookClient from "../bookClient";

describe("Given the getBookshelfStats method of bookClient", () => {
  describe("When it's called", () => {
    test("Then it should return manga bookshelf stats, as a total of 2 books read, 2 authors and 464 pages", async () => {
      const bookClient = new BookClient();

      const mangaBookshelfStats = await bookClient.getBookshelfStats();

      expect(mangaBookshelfStats).toMatchObject(mangaStats);
    });
  });

  describe("When it's called and response is not ok", () => {
    test("Then it should throw 'Error fetching bookshelf stats'", async () => {
      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.get(`${apiUrl}/books/stats`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const bookClient = new BookClient();

      const stats = bookClient.getBookshelfStats();

      await expect(stats).rejects.toThrow("Error fetching bookshelf stats");
    });
  });
});
