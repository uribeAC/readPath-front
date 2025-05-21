import type React from "react";
import { useState } from "react";
import { bookGenres } from "../../data/genres";
import Button from "../../../components/Button/Button";
import type { BookFilter } from "../../types";
import "./BookFilter.css";
import { useLocation, useNavigate } from "react-router";

const BookFilter: React.FC = () => {
  const initialFilters: BookFilter = { genre: "All", state: "All" };
  const [filters, setFilters] = useState<BookFilter>(initialFilters);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const changeFilters = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;

    setFilters((filters) => ({
      ...filters,
      [event.target.id]: newValue,
    }));
  };

  const newUrl = new URL(apiUrl + pathname);

  if (filters.state !== "All") {
    newUrl.searchParams.set("state", filters.state);
  }

  if (filters.genre !== "All") {
    newUrl.searchParams.set("genre", filters.genre);
  }

  const onSubmit = () => {
    navigate("/books" + newUrl.search);
  };

  return (
    <form onSubmit={onSubmit} className="filter">
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
              value={filters.state}
              onChange={changeFilters}
            >
              <option>All</option>
              <option>Read</option>
              <option>To read</option>
            </select>
          </div>
          <div className="filter__group">
            <label htmlFor="genre" className="filter__text">
              Genre:
            </label>
            <select
              id="genre"
              className="filter__control"
              value={filters.genre}
              onChange={changeFilters}
            >
              <option>All</option>
              {bookGenres.map((genre) => (
                <option key={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Button
        buttonType="submit"
        action={() => {}}
        isSelected={true}
        isDisabled={false}
        classModifierName="filter"
      >
        Search
      </Button>
    </form>
  );
};

export default BookFilter;
