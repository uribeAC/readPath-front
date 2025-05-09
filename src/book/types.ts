export interface Book {
  id: string;
  title: string;
  author: string;
  saga?: {
    name: string;
    bookNumber: number;
  };
  description: string;
  genres: string[];
  pages: number;
  firstPublished: Date;
  state: "read" | "to read";
  yourRating?: Rating;
  readDates?: ReadDates;
  coverImageUrlSmall: string;
  coverImageUrlBig: string;
  imageAlt: string;
}

type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export type ReadDates = {
  dateStarted?: Date;
  dateFinished?: Date;
  readYear?: number;
};
