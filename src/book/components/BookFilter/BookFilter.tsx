import type React from "react";
import { Link, useLocation } from "react-router";
import { bookGenres } from "../../data/genres";
import useFilter from "../../../hooks/useFilter";
import "./BookFilter.css";

const BookFilter: React.FC = () => {
  const { filter, setStateFilter, setGenreFilter } = useFilter();
  const { pathname } = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;

  const changeState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;

    setStateFilter(newValue);
  };

  const changeGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;

    setGenreFilter(newValue);
  };

  const newUrl = new URL(apiUrl + pathname);

  if (filter.state !== "All") {
    newUrl.searchParams.set("state", filter.state);
  }

  if (filter.genre !== "All") {
    newUrl.searchParams.set("genre", filter.genre);
  }

  return (
    <div className="filter">
      <div className="filter__form">
        <h3 className="filter__title">Filter:</h3>
        <div className="filter__groups">
          <div className="filter__group">
            <label htmlFor="state" className="filter__text">
              State:
            </label>
            <select
              id="state"
              className="filter__control"
              value={filter.state}
              onChange={changeState}
            >
              <option>All</option>
              <option>read</option>
              <option>to read</option>
            </select>
          </div>
          <div className="filter__group">
            <label htmlFor="genre" className="filter__text">
              Genre:
            </label>
            <select
              id="genre"
              className="filter__control"
              value={filter.genre}
              onChange={changeGenre}
            >
              <option>All</option>
              {bookGenres.map((genre) => (
                <option key={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Link to={"/books" + newUrl.search} className="filter__button">
        Search
      </Link>
    </div>
  );
};

export default BookFilter;
