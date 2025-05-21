import type React from "react";
import { bookGenres } from "../../data/genres";
import Button from "../../../components/Button/Button";
import "./BookFilter.css";

const BookFilter: React.FC = () => {
  return (
    <form action="" className="filter">
      <div className="filter__form">
        <h3 className="filter__title">Filter:</h3>
        <div className="filter__groups">
          <div className="filter__group">
            <label htmlFor="state" className="filter__text">
              State:
            </label>
            <select id="state" className="filter__control">
              <option value="">All</option>
              <option value="">read</option>
              <option value="">to read</option>
            </select>
          </div>
          <div className="filter__group">
            <label htmlFor="genre" className="filter__text">
              Genre:
            </label>
            <select id="genre" className="filter__control">
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
