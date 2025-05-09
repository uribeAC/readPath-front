import type { Book } from "../types";

export type BookDto = Omit<Book, "id" | "firstPublished" | "readDates"> & {
  _id: string;
  firstPublished: string;
  readDates?: ReadDatesDto;
};

export type ReadDatesDto = {
  dateStarted?: string;
  dateFinished?: string;
  readYear?: number;
};
