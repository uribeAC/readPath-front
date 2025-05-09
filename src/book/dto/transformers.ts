import type { BooksInfo, BooksInfoDto } from "../client/bookClient/types";
import type { Book, ReadDates } from "../types";

export const transformBooksInfoDtoToBooksInfo = ({
  books: booksDto,
  totals,
}: BooksInfoDto): BooksInfo => {
  const books = booksDto.map<Book>(
    ({ _id, firstPublished, readDates: readDatesDto, ...bookDto }) => {
      let readDates: ReadDates = {};

      if (readDatesDto) {
        readDates = {
          ...(readDatesDto.dateStarted && {
            dateStarted: new Date(readDatesDto.dateStarted),
          }),
          ...(readDatesDto.dateFinished && {
            dateFinished: new Date(readDatesDto.dateFinished),
          }),
          ...(readDatesDto.readYear && {
            readYear: readDatesDto.readYear,
          }),
        };
      }

      let book: Book;

      if (Object.keys(readDates).length !== 0) {
        book = {
          id: _id,
          firstPublished: new Date(firstPublished),
          readDates: readDates,
          ...bookDto,
        };
      } else {
        book = {
          id: _id,
          firstPublished: new Date(firstPublished),
          ...bookDto,
        };
      }

      return book;
    },
  );

  const booksInfo: BooksInfo = {
    books,
    totals,
  };

  return booksInfo;
};
