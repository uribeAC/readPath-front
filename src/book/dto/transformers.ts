import type { BooksInfo, BooksInfoDto } from "../client/types";
import type { Book, ReadDates } from "../types";
import type { BookDto } from "./types";

export const transformBooksInfoDtoToBooksInfo = ({
  books: booksDto,
  totals,
}: BooksInfoDto): BooksInfo => {
  const books = transformBooksDtoToBooks(booksDto);

  const booksInfo: BooksInfo = {
    books,
    totals,
  };

  return booksInfo;
};

export const transformBooksDtoToBooks = (booksDto: BookDto[]): Book[] => {
  const books = booksDto.map<Book>(
    ({ _id, firstPublished, readDates: readDatesDto, ...bookDto }) => {
      let readDates: ReadDates = {};

      if (readDatesDto) {
        readDates = {
          ...(readDatesDto.dateStarted && {
            dateStarted: transformStringToDateString(readDatesDto.dateStarted),
          }),
          ...(readDatesDto.dateFinished && {
            dateFinished: transformStringToDateString(
              readDatesDto.dateFinished,
            ),
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
          firstPublished: transformStringToDateString(firstPublished),
          readDates: readDates,
          ...bookDto,
        };
      } else {
        book = {
          id: _id,
          firstPublished: transformStringToDateString(firstPublished),
          ...bookDto,
        };
      }

      return book;
    },
  );

  return books;
};

const transformStringToDateString = (date: string): string => {
  const newDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return newDate;
};
