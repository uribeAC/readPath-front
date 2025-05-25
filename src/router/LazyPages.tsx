import { lazy } from "react";

export const LazyNotFoundPage = lazy(
  () => import("../ui/pages/NotFoundPage/NotFoundPage"),
);

export const LazyBooksPage = lazy(
  () => import("../book/pages/BooksPage/BooksPage"),
);

export const LazyAddBookPage = lazy(
  () => import("../book/pages/AddBookPage/AddBookPage"),
);

export const LazyBookDetailPage = lazy(
  () => import("../book/pages/BookDetailPage/BookDetailPage"),
);

export const LazyModifyBookPage = lazy(
  () => import("../book/pages/ModifyBookPage/ModifyBookPage"),
);

export const LazyStatsPage = lazy(
  () => import("../book/pages/StatsPage/StatsPage"),
);
