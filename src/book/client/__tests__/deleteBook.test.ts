import { http, HttpResponse } from "msw";
import { narutoBook } from "../../fixtures/fixtures";
import { narutoVol1 } from "../../fixtures/fixturesDto";
import { server } from "../../mocks/node";
import BookClient from "../bookClient";

describe("Given the deleteBook method of bookClient", () => {
  describe("When it's called with Naruto Vol. 1 book id", () => {
    test("Then it should return Naruto Vol. 1 book", async () => {
      const bookClient = new BookClient();

      const deletedBook = await bookClient.deleteBook(narutoVol1._id);

      expect(deletedBook).toMatchObject(narutoBook);
    });
  });

  describe("When it's called and response is not ok", () => {
    test("Then it should throw 'Error deleting book'", () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const expectedErrorMessage = "Error deleting book";

      server.use(
        http.delete(`${apiUrl}/books/159678901234567890123456`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const bookClient = new BookClient();

      const deletedBook = bookClient.deleteBook("159678901234567890123456");

      expect(deletedBook).rejects.toThrow(expectedErrorMessage);
    });
  });
});
