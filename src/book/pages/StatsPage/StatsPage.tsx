import React, { useEffect } from "react";
import BookYearsChart from "../../components/BookCharts/BookYearsChart";
import BookDoughnut from "../../components/BookCharts/BookDoughnut";
import useBooks from "../../hooks/useBooks";
import Loading from "../../../ui/components/Loading/Loading";
import useLoading from "../../../ui/hooks/useLoading";
import "./StatsPage.css";
import "../styles/pages.css";

const StatsPage: React.FC = () => {
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    loadStats,
    statsState: {
      booksYear,
      genres,
      totals: { authors, pages, read },
    },
  } = useBooks();
  const {
    loadingState: { isLoading },
  } = useLoading();

  const genresLabels = genres.genres.map((genre) => genre.genre);
  const genreData = genres.genres.map((genre) => genre.booksTotal);
  const genresSliced = genresLabels.slice(0, 10);

  const yearsLabels = booksYear.map((year) => year.year.toString());
  const yearsReadTotal = booksYear.map((year) => year.totals.read);
  const yearsPagesTotal = booksYear.map((year) => year.totals.pages);
  const yearsAuthorsTotal = booksYear.map((year) => year.totals.authors);

  const booksAuthorsChartDescription = yearsLabels
    .map(
      (year, index) =>
        `${year}: ${yearsReadTotal[index]} read books from ${yearsAuthorsTotal[index]} authors`,
    )
    .join(". ");
  const pagesChartDescription = yearsLabels
    .map((year, index) => `${year}: ${yearsPagesTotal[index]} pages read`)
    .join(". ");
  const genresChartDescription = genresSliced.map(
    (genre, index) => `${genreData[index]} of ${genre}`,
  );

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  if (isLoading) {
    return <Loading />;
  }

  if (read > 0) {
    return (
      <main className="stats-page">
        <header>
          <h2 className="page-title">Bookshelf stats</h2>
        </header>
        <div className="stats-page__summary">
          <span className="stats-page__stats">Books read: {read}</span>
          <span className="stats-page__stats">Pages read: {pages}</span>
          <span className="stats-page__stats">Authors read: {authors}</span>
        </div>
        <div className="charts">
          <div className="chart">
            <h3 className="chart__title">Books and Authors Read per Year</h3>
            <BookYearsChart
              labels={yearsLabels}
              firstDataset={yearsReadTotal}
              firstLabel="Read"
              secondDataset={yearsAuthorsTotal}
              secondLabel="Authors"
              ariaLabel="Bar chart of read books and authors by year"
            />
            <p className="visually-hidden">{pagesChartDescription}</p>
            <ul className="chart__legend">
              <li className="chart__tag chart__tag--orange" aria-hidden>
                Books read
              </li>
              <li className="chart__tag chart__tag--yellow" aria-hidden>
                Authors read
              </li>
            </ul>
          </div>
          <div className="chart">
            <h3 className="chart__title">Pages Read per Year</h3>
            <BookYearsChart
              labels={yearsLabels}
              firstDataset={yearsPagesTotal}
              firstLabel="Pages"
              ariaLabel="Doughnout chart of books read by genre"
            />
            <p className="visually-hidden">{booksAuthorsChartDescription}</p>
            <span className="chart__tag chart__tag--orange" aria-hidden>
              Pages read
            </span>
          </div>
          <div className="chart chart--last">
            <h3 className="chart__title">Books Read by Genre</h3>
            <BookDoughnut
              dataNumbers={genreData}
              labels={genresLabels}
              labelTitle="Genres"
              ariaLabel="Doughnout chart of books read by genre"
            />
            <p className="visually-hidden">{genresChartDescription}</p>
            <ul className="chart__legend">
              {genresSliced.map((genre, index) => (
                <li className={`chart__tag chart__tag--${index}`} key={genre}>
                  {genre}: {genreData[index]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    );
  }

  return <></>;
};

export default StatsPage;
