import { http, HttpResponse } from "msw";
import { dragonBallModifiedDto } from "../../fixtures/fixturesDto";
import { server } from "../../mocks/node";
import BookClient from "../bookClient";

describe("Given the modifyBook method of bookClient", () => {
  describe("When it's called with Dragon Ball Vol. 1 book id and the modified book data", () => {
    test("Then it should return Dragon Ball Vol. 12 book", async () => {
      const expectedTitle = "Dragon Ball, Vol. 12";
      const bookClient = new BookClient();

      const modifiedBook = await bookClient.modifyBook(
        dragonBallModifiedDto._id,
        dragonBallModifiedDto,
      );

      expect(modifiedBook).toMatchObject({ title: expectedTitle });
    });
  });

  describe("When it's called and response is not ok", () => {
    test("Then it should throw 'Error adding new book'", () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const expectedErrorMessage = "Error modifying book";

      const fetchUrl = `${apiUrl}/books/${dragonBallModifiedDto._id}`;

      server.use(
        http.put(fetchUrl, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const bookClient = new BookClient();

      const modifiedBook = bookClient.modifyBook(
        dragonBallModifiedDto._id,
        dragonBallModifiedDto,
      );

      expect(modifiedBook).rejects.toThrow(expectedErrorMessage);
    });
  });
});
