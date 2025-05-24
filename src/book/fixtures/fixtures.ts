import { transformBooksDtoToBooks } from "../dto/transformers";
import type { Book, BookSendData, BookStats } from "../types";
import { shonenFixturesDto } from "./fixturesDto";

export const shonenFixtures = transformBooksDtoToBooks(shonenFixturesDto);

export const narutoBook = shonenFixtures[0];

export const dragonBallRead: Book = {
  id: "1234567890dragonball5555",
  title: "Dragon Ball, Vol. 1",
  author: "Akira Toriyama",
  saga: {
    name: "Dragon Ball",
    bookNumber: 1,
  },
  description:
    "Follow the adventures of a young monkey-tailed boy named Goku as he embarks on a journey to collect the seven mystical Dragon Balls. Along the way, he meets Bulma, Master Roshi, and other unforgettable characters in the beginning of this legendary manga series.",
  genres: ["Manga", "Action", "Adventure", "Comedy"],
  pages: 192,
  firstPublished: "2003-05-06",
  state: "read",
  yourRating: 5,
  readDates: {
    dateStarted: "2021-03-15",
    dateFinished: "2021-03-17",
    readYear: 2021,
  },
  coverImageUrlSmall:
    "https://images-na.ssl-images-amazon.com/images/I/51Ypye1bxBL._SX331_BO1,204,203,200_.jpg",
  coverImageUrlBig:
    "https://images-na.ssl-images-amazon.com/images/I/51Ypye1bxBL.jpg",
  imageAlt: "Dragon Ball Volume 1 cover featuring young Goku riding a cloud",
};

export const dragonBallToRead: Book = {
  id: "1234567890dragonball5555",
  title: "Dragon Ball, Vol. 1",
  author: "Akira Toriyama",
  saga: {
    name: "Dragon Ball",
    bookNumber: 1,
  },
  description:
    "Follow the adventures of a young monkey-tailed boy named Goku as he embarks on a journey to collect the seven mystical Dragon Balls. Along the way, he meets Bulma, Master Roshi, and other unforgettable characters in the beginning of this legendary manga series.",
  genres: ["Manga", "Action", "Adventure", "Comedy"],
  pages: 192,
  firstPublished: "2003-05-06",
  state: "to read",
  coverImageUrlSmall:
    "https://images-na.ssl-images-amazon.com/images/I/51Ypye1bxBL._SX331_BO1,204,203,200_.jpg",
  coverImageUrlBig:
    "https://images-na.ssl-images-amazon.com/images/I/51Ypye1bxBL.jpg",
  imageAlt: "Dragon Ball Volume 1 cover featuring young Goku riding a cloud",
};

export const dragonBallData: BookSendData = {
  title: "Dragon Ball, Vol. 1",
  author: "Akira Toriyama",
  saga: {
    name: "Dragon Ball",
    bookNumber: 1,
  },
  description:
    "Follow the adventures of a young monkey-tailed boy named Goku as he embarks on a journey to collect the seven mystical Dragon Balls. Along the way, he meets Bulma, Master Roshi, and other unforgettable characters in the beginning of this legendary manga series.",
  genres: ["Manga", "Action", "Adventure", "Comedy"],
  pages: 192,
  firstPublished: "2003-05-06",
  state: "to read",
  coverImageUrlSmall:
    "https://images-na.ssl-images-amazon.com/images/I/51Ypye1bxBL._SX331_BO1,204,203,200_.jpg",
  coverImageUrlBig:
    "https://images-na.ssl-images-amazon.com/images/I/51Ypye1bxBL.jpg",
  imageAlt: "Dragon Ball Volume 1 cover featuring young Goku riding a cloud",
};

export const mangaStats: BookStats = {
  totals: {
    read: 10,
    pages: 12265,
    authors: 8,
  },
  genres: {
    total: 13,
    genres: [
      {
        genre: "Fiction",
        booksTotal: 14,
      },
      {
        genre: "Fantasy",
        booksTotal: 13,
      },
      {
        genre: "Science Fiction",
        booksTotal: 11,
      },
      {
        genre: "Dystopia",
        booksTotal: 6,
      },
      {
        genre: "Adventure",
        booksTotal: 6,
      },
      {
        genre: "Epic Fantasy",
        booksTotal: 5,
      },
      {
        genre: "High Fantasy",
        booksTotal: 5,
      },
      {
        genre: "LitRPG",
        booksTotal: 2,
      },
      {
        genre: "Young Adult",
        booksTotal: 2,
      },
      {
        genre: "Mystery",
        booksTotal: 2,
      },

      {
        genre: "Thriller",
        booksTotal: 1,
      },
      {
        genre: "Anthropomorphic",
        booksTotal: 1,
      },
      {
        genre: "Humor",
        booksTotal: 1,
      },
    ],
  },
  booksYear: [
    {
      year: 2022,
      totals: {
        read: 4,
        pages: 2364,
        authors: 1,
      },
    },
    {
      year: 2023,
      totals: {
        read: 6,
        pages: 5686,
        authors: 2,
      },
    },
    {
      year: 2024,
      totals: {
        read: 2,
        pages: 1068,
        authors: 2,
      },
    },
    {
      year: 2025,
      totals: {
        read: 2,
        pages: 1949,
        authors: 2,
      },
    },
  ],
};
