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
  userRating?: StarsRating;
  readDates?: ReadDates;
  coverImageUrlSmall: string;
  coverImageUrlBig: string;
  imageAlt: string;
}

export type BookSendData = Omit<Book, "id">;

export type BookFormData = Omit<
  Book,
  | "id"
  | "saga"
  | "genres"
  | "userRating"
  | "coverImageUrlBig"
  | "coverImageUrlSmall"
  | "imageAlt"
> & {
  saga?: string;
  coverImageUrl: string;
  genres: string;
  userRating?: string;
};

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

export type BookFilters = {
  state?: string;
  genre?: string;
};

export interface BookStats {
  totals: BookStatsTotals;
  genres: {
    total: number;
    genres: {
      genre: string;
      booksTotal: number;
    }[];
  };
  booksYear: {
    year: number;
    totals: BookStatsTotals;
  }[];
}

export type BookStatsTotals = {
  read: number;
  pages: number;
  authors: number;
};
