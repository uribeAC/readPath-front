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
  firstPublished: string;
  state: "read" | "to read";
  yourRating?: StarsRating;
  readDates?: ReadDates;
  coverImageUrlSmall: string;
  coverImageUrlBig: string;
  imageAlt: string;
}

export type StarsRating = 0 | 1 | 2 | 3 | 4 | 5;

export type ReadDates = {
  dateStarted?: string;
  dateFinished?: string;
  readYear?: number;
};

export type Star = {
  starUrl: string;
  starAlt: string;
};
