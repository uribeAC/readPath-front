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

export const transformDescriptionDtoToDescriptionPreview = (
  description: string,
): string => {
  const paragraphs = description.split("\n\n");
  const previewDescription = paragraphs.splice(0, 2).join("\n\n");

  return previewDescription;
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
  {
    coverImageUrl,
    title,
    saga,
    yourRating,
    readDates,
    ...bookData
  }: BookFormData,
  selectedGenres: string[],
): BookSendData => {
  const sagaInfo: string[] = saga ? saga.split(",") : [];

  const sagaName = sagaInfo[0];
  const sagaNumber = sagaInfo[sagaInfo.length - 1];

  const bookSaga = {
    name: sagaName,
    bookNumber: Number(sagaNumber),
  };

  const cleanReadDates: ReadDates = {
    ...(readDates!.dateStarted && { dateStarted: readDates!.dateStarted }),
    ...(readDates!.dateFinished && { dateFinished: readDates!.dateFinished }),
    ...(readDates!.dateFinished && {
      readYear: new Date(readDates!.dateFinished).getFullYear(),
    }),
  };

  const starRating = Math.round(Number(yourRating)) as StarsRating;

  const sendBook: BookSendData = {
    ...bookData,
    title,
    coverImageUrlBig: coverImageUrl,
    coverImageUrlSmall: coverImageUrl,
    imageAlt: `${title} book cover`,
    genres: selectedGenres,
    ...(Object.keys(cleanReadDates).length > 0 && {
      readDates: cleanReadDates,
    }),
    ...(saga && { saga: bookSaga }),
    ...(yourRating && { yourRating: starRating }),
  };

  return sendBook;
};
