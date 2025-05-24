import type React from "react";
import { useEffect } from "react";
import BookYearsChart from "../../components/BookCharts/BookYearsChart";
import BookDoughnut from "../../components/BookCharts/BookDoughnut";
import useBooks from "../../hooks/useBooks";

const StatsPage: React.FC = () => {
  const { loadStats, stats } = useBooks();

  const genresLabels = stats.genres.genres.map((genre) => genre.genre);
  const genreData = stats.genres.genres.map((genre) => genre.booksTotal);

  const yearsLabels = stats.booksYear.map((year) => year.year.toString());
  const yearsReadTotal = stats.booksYear.map((year) => year.totals.read);
  const yearsPagesTotal = stats.booksYear.map((year) => year.totals.pages);
  const yearsAuthorsTotal = stats.booksYear.map((year) => year.totals.authors);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  if (stats.totals.read > 0) {
    return (
      <main className="add-page-container">
        <header>
          <h2 className="add-page-header__title">Add a new book</h2>
        </header>
        <BookYearsChart
          labels={yearsLabels}
          firstDataset={yearsReadTotal}
          firstLabel="Read"
          secondDataset={yearsAuthorsTotal}
          secondLabel="Authors"
        />
        <BookYearsChart
          labels={yearsLabels}
          firstDataset={yearsPagesTotal}
          firstLabel="Pages"
        />
        <BookDoughnut
          dataNumbers={genreData}
          labels={genresLabels}
          labelTitle="Genres"
        />
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
