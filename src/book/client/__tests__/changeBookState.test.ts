import { http, HttpResponse } from "msw";
import { dragonBallRead, dragonBallToRead } from "../../fixtures/fixtures";
import { server } from "../../mocks/node";
import BookClient from "../bookClient";

describe("Given the changeBookState method of bookClient", () => {
  describe("When it's called with Dragon Ball Vol. 1 id marked as 'to read' and an action state of 'read'", () => {
    test("Then it should return Dragon Ball Vol. 1 marked as read", async () => {
      const bookClient = new BookClient();

      const book = await bookClient.changeBookState(
        "read",
        dragonBallToRead.id,
      );

      expect(book.state).toBe("read");
    });

    describe("And the response is not ok", () => {
      test("Then it should throw 'Error marking book as read'", async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const expectedErrorMessage = "Error marking book as read";

        server.use(
          http.patch(
            `${apiUrl}/books/mark-as-read/${dragonBallToRead.id}`,
            () => {
              return new HttpResponse(null, { status: 500 });
            },
          ),
        );

        const bookClient = new BookClient();

        const book = bookClient.changeBookState("read", dragonBallToRead.id);

        await expect(book).rejects.toThrow(expectedErrorMessage);
      });
    });
  });

  describe("When it's called with Dragon Ball Vol. 1 id marked as 'read' and an action state of 'to read'", () => {
    test("Then it should return Dragon Ball Vol. 1 marked as to read", async () => {
      const bookClient = new BookClient();

      const book = await bookClient.changeBookState(
        "toread",
        dragonBallRead.id,
      );

      expect(book.state).toBe("to read");
    });

    describe("And the response is not ok", () => {
      test("Then it should throw 'Error marking book as toread'", async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const expectedErrorMessage = "Error marking book as toread";

        server.use(
          http.patch(
            `${apiUrl}/books/mark-as-toread/${dragonBallToRead.id}`,
            () => {
              return new HttpResponse(null, { status: 500 });
            },
          ),
        );

        const bookClient = new BookClient();

        const book = bookClient.changeBookState("toread", dragonBallRead.id);

        await expect(book).rejects.toThrow(expectedErrorMessage);
      });
    });
  });
});
