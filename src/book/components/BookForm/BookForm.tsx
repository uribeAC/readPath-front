import type React from "react";
import "./BookForm.css";
import Button from "../../../components/Button/Button";

const BookForm: React.FC = () => {
  const bookGenres = [
    "Fiction",
    "Non-fiction",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Historical Fiction",
    "Biography",
    "Autobiography",
    "Memoir",
    "Self-help",
    "Horror",
    "Young Adult",
    "Children's",
    "Classic",
    "Adventure",
    "Dystopian",
    "Graphic Novel",
    "Poetry",
    "Philosophy",
    "Science",
    "Travel",
    "Spirituality",
    "Crime",
    "Drama",
    "Humor",
    "Short Stories",
  ];
  const selectedGenres: string[] = [];

  return (
    <form action="" className="book-form">
      <div className="book-form__group">
        <label htmlFor="title" className="book-form__text">
          Title:
        </label>
        <input type="text" id="title" className="book-form__control" required />
      </div>
      <div className="book-form__group">
        <label htmlFor="author" className="book-form__text">
          Author:
        </label>
        <input
          type="text"
          id="author"
          className="book-form__control"
          required
        />
      </div>
      <div className="book-form__group">
        <label htmlFor="description" className="book-form__text">
          Description:
        </label>
        <textarea
          rows={5}
          id="description"
          className="book-form__control"
          required
        />
      </div>
      <div className="book-form__group">
        <label htmlFor="saga" className="book-form__text">
          Saga:
        </label>
        <input type="text" id="saga" className="book-form__control" />
      </div>
      <div className="book-form__group">
        <label htmlFor="cover-image-url" className="book-form__text">
          Cover image url:
        </label>
        <input
          type="url"
          id="cover-image-url"
          className="book-form__control"
          required
        />
      </div>
      <div className="book-form__group">
        <label htmlFor="genres" className="book-form__text">
          Genres:
        </label>
        <select id="genres" className="book-form__control" required>
          <option></option>
          {bookGenres.map((genre) => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
        {selectedGenres.length !== 0 && (
          <ul className="genres">
            {selectedGenres.map((genre) => (
              <li key={genre} className="genre">
                {genre}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="book-form__group">
        <label htmlFor="first-published" className="book-form__text">
          First published:
        </label>
        <input
          type="date"
          id="first-published"
          className="book-form__control"
          required
        />
      </div>
      <div className="book-form__group">
        <label htmlFor="total-pages" className="book-form__text">
          Total pages:
        </label>
        <input
          type="number"
          id="total-pages"
          className="book-form__control"
          required
        />
      </div>
      <div className="book-form__group">
        <h3 className="book-form__text">State:</h3>
        <div className="book-form__states">
          <div className="book-form__state">
            <label htmlFor="read" className="book-form__text">
              Read
            </label>
            <input
              type="checkbox"
              id="read"
              className="book-form__control book-form__control--hidden"
              required
            />
          </div>
          <div className="book-form__state">
            <label htmlFor="to-read" className="book-form__text">
              To read
            </label>
            <input
              type="checkbox"
              id="to-read"
              className="book-form__control book-form__control--hidden"
              required
            />
          </div>
        </div>
      </div>
      <div className="book-form__group">
        <label htmlFor="date-started" className="book-form__text">
          Date started:
        </label>
        <input
          type="date"
          id="date-started"
          className="book-form__control"
          required
        />
      </div>
      <div className="book-form__group">
        <label htmlFor="date-finished" className="book-form__text">
          Date finished:
        </label>
        <input
          type="date"
          id="date-finished"
          className="book-form__control"
          required
        />
      </div>
      <div className="book-form__group">
        <label htmlFor="your-rating" className="book-form__text">
          Your rating:
        </label>
        <input
          type="number"
          id="your-rating"
          className="book-form__control"
          min={0}
          step={1}
          max={5}
          required
        />
      </div>
      <Button
        action={() => {}}
        isSelected={true}
        isDisabled={false}
        classModifierName="form"
      >
        add book
      </Button>
    </form>
  );
};

export default BookForm;
