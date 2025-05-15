import { http, HttpResponse } from "msw";
import { dragonBallData } from "../../fixtures/fixtures";
import { server } from "../../mocks/node";
import BookClient from "../bookClient";

describe("Given the addBook method of bookClient", () => {
  describe("When it's called with Dragon Ball Vol. 1 book data", () => {
    test("Then it should return Dragon Ball Vol. 1 book", async () => {
      const expectedTitle = "Dragon Ball, Vol. 1";
      const bookClient = new BookClient();

      const newBook = await bookClient.addBook(dragonBallData);

      expect(newBook).toMatchObject({ title: expectedTitle });
    });
  });

  describe("When it's called and response is not ok", () => {
    test("Then it should throw 'Error adding new book'", () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const expectedErrorMessage = "Error adding new book";

      server.use(
        http.post(`${apiUrl}/books`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const bookClient = new BookClient();

      const newBook = bookClient.addBook(dragonBallData);

      expect(newBook).rejects.toThrow(expectedErrorMessage);
    });
  });
});
