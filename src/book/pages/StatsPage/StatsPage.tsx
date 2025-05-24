import type React from "react";
import { useEffect } from "react";
import BookYearsChart from "../../components/BookCharts/BookYearsChart";
import BookDoughnut from "../../components/BookCharts/BookDoughnut";
import useBooks from "../../hooks/useBooks";
import "./StatsPage.css";

const StatsPage: React.FC = () => {
  const { loadStats, stats } = useBooks();

  const { authors, pages, read } = stats.totals;

  const genresLabels = stats.genres.genres.map((genre) => genre.genre);
  const genreData = stats.genres.genres.map((genre) => genre.booksTotal);
  const genresSliced = genresLabels.slice(0, 10);

  const yearsLabels = stats.booksYear.map((year) => year.year.toString());
  const yearsReadTotal = stats.booksYear.map((year) => year.totals.read);
  const yearsPagesTotal = stats.booksYear.map((year) => year.totals.pages);
  const yearsAuthorsTotal = stats.booksYear.map((year) => year.totals.authors);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  if (stats.totals.read > 0) {
    return (
      <main className="stats-page">
        <header>
          <h2 className="stats-page__title">Bookshelf stats</h2>
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
            <ul className="chart__legend">
              <li className="chart__tag chart__tag--orange">Books read</li>
              <li className="chart__tag chart__tag--yellow">Authors read</li>
            </ul>
          </div>
          <div className="chart">
            <h3 className="chart__title">Pages Read per Year</h3>
            <BookYearsChart
              labels={yearsLabels}
              firstDataset={yearsPagesTotal}
              firstLabel="Pages"
              ariaLabel="Bar chart of read pages by year"
            />
            <span className="chart__tag chart__tag--orange">Pages read</span>
          </div>
          <div className="chart chart--last">
            <h3 className="chart__title">Books Read by Genre</h3>
            <BookDoughnut
              dataNumbers={genreData}
              labels={genresLabels}
              labelTitle="Genres"
              ariaLabel="Doughnout chart of books read by genre"
            />
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

  return (
    <main className="add-page-container">
      <header>
        <h2 className="add-page-header__title">Add a new book</h2>
      </header>
    </main>
  );
};

export default StatsPage;
