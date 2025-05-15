import type { BooksInfo, BooksInfoDto } from "../client/types";
import type {
  Book,
  BookFormData,
  BookSendData,
  ReadDates,
  StarsRating,
} from "../types";
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
  const books = booksDto.map<Book>((bookDto) => {
    const book = transformBookDtoToBook(bookDto);

    return book;
  });

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

export const transformBookDtoToBook = ({
  _id,
  firstPublished,
  readDates: readDatesDto,
  ...bookDto
}: BookDto): Book => {
  let readDates: ReadDates = {};

  if (readDatesDto) {
    readDates = {
      ...(readDatesDto.dateStarted && {
        dateStarted: transformStringToDateString(readDatesDto.dateStarted),
      }),
      ...(readDatesDto.dateFinished && {
        dateFinished: transformStringToDateString(readDatesDto.dateFinished),
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
};

export const transfromBookFormDataToBookSendData = (
  { coverImageUrl, title, saga, yourRating, ...bookData }: BookFormData,
  selectedGenres: string[],
): BookSendData => {
  const sagaInfo: string[] = saga ? saga.split(",") : [];

  const sagaName = sagaInfo[0];
  const sagaNumber = sagaInfo[sagaInfo.length - 1];

  const bookSaga = {
    name: sagaName,
    bookNumber: Number(sagaNumber),
  };

  const starRating = Math.round(Number(yourRating)) as StarsRating;

  const sendBook: BookSendData = {
    ...bookData,
    title,
    coverImageUrlBig: coverImageUrl,
    coverImageUrlSmall: coverImageUrl,
    imageAlt: `${title} book cover`,
    genres: selectedGenres,
    ...(saga && { saga: bookSaga }),
    ...(yourRating && { yourRating: starRating }),
  };

  return sendBook;
};
