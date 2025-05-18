import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../../components/Button/Button";
import type { BookFormData, BookSendData } from "../../types";
import { bookGenres } from "../../data/genres";
import { transfromBookFormDataToBookSendData } from "../../dto/transformers";
import useModal from "../../../hooks/useModal";
import "./BookForm.css";

interface BookFormProps {
  action: (bookData: BookSendData) => Promise<void>;
}

const BookForm: React.FC<BookFormProps> = ({ action }) => {
  const { showModal } = useModal();

  const initialBookData: BookFormData = {
    title: "",
    author: "",
    description: "",
    saga: "",
    coverImageUrl: "",
    genres: "",
    firstPublished: "",
    pages: 0,
    state: "to read",
    readDates: {
      dateFinished: "",
      dateStarted: "",
      readYear: 0,
    },
    yourRating: "",
  };

  const [bookData, setBookData] = useState<BookFormData>(initialBookData);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const isToRead = bookData.state === "to read";

  const stateReadClassModifier =
    bookData.state === "read" ? " book-form__button--selected" : "";

  const stateToReadClassModifier =
    bookData.state === "to read" ? " book-form__button--selected" : "";

  const formToReadClass = isToRead ? " book-form__group--hidden" : "";

  const changeBookData = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value;

    setBookData((bookData) => ({
      ...bookData,
      [event.target.id]: newValue,
    }));
  };

  const changeBookReadDates = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setBookData((bookData) => ({
      ...bookData,
      readDates: {
        ...bookData.readDates,
        [event.target.id]: newValue,
      },
    }));
  };

  const changeBookState = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.id;

    if (newValue === "toread") {
      newValue = "to read";
    }

    const value = newValue as "read" | "to read";

    setBookData((bookData) => ({
      ...bookData,
      state: value,
    }));
  };

  const changeMultilpleGenres = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = event.target.value;

    setSelectedGenres((selectedGenres) => [...selectedGenres, newValue]);

    setBookData((bookData) => ({
      ...bookData,
      genres: newValue,
    }));
  };

  const deleteGenre = (genre: string) => {
    setSelectedGenres((selectedGenres) =>
      selectedGenres.filter((selectedGenre) => selectedGenre !== genre),
    );

    if (selectedGenres.length <= 1) {
      setBookData((bookData) => ({
        ...bookData,
        genres: "",
      }));
    }
  };

  const isFormValid =
    bookData.author !== "" &&
    bookData.coverImageUrl !== "" &&
    bookData.description !== "" &&
    bookData.firstPublished !== "" &&
    bookData.genres !== "" &&
    bookData.pages !== 0 &&
    bookData.title !== "";

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [titleErrorMessage, setTitleErrorMessage] = useState<string>("");

  const onSubmitForm = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setErrorMessage("");
    setTitleErrorMessage("");

    const toSendBook = transfromBookFormDataToBookSendData(
      bookData,
      selectedGenres,
    );

    try {
      await action(toSendBook);

      navigate("/books");
      showModal("Book added to bookshelf", false);
    } catch {
      setErrorMessage("Error adding new book");
      setTitleErrorMessage("This book title is already in your bookshelf");
    }
  };

  return (
    <form onSubmit={onSubmitForm} className="book-form">
      <div className="book-form__group">
        <div className="book-form__texts">
          <label htmlFor="title" className="book-form__text">
            Title:
          </label>
          {titleErrorMessage && (
            <span className="book-form__error">{titleErrorMessage}</span>
          )}
        </div>
        <input
          type="text"
          id="title"
          className="book-form__control"
          value={bookData.title}
          onChange={changeBookData}
          required
        />
      </div>
      <div className="book-form__group">
        <label htmlFor="author" className="book-form__text">
          Author:
        </label>
        <input
          type="text"
          id="author"
          className="book-form__control"
          value={bookData.author}
          onChange={changeBookData}
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
          value={bookData.description}
          onChange={changeBookData}
          required
        />
      </div>
      <div className="book-form__group">
        <div className="book-form__texts">
          <label htmlFor="saga" className="book-form__text">
            Saga:
          </label>
          <span className="book-form__text--explanation">
            {" "}
            (saga name, book number) *optional
          </span>
        </div>
        <input
          type="text"
          id="saga"
          className="book-form__control"
          value={bookData.saga}
          onChange={changeBookData}
        />
      </div>
      <div className="book-form__group">
        <label htmlFor="coverImageUrl" className="book-form__text">
          Cover image url:
        </label>
        <input
          type="url"
          id="coverImageUrl"
          className="book-form__control"
          value={bookData.coverImageUrl}
          onChange={changeBookData}
          required
        />
      </div>
      <div className="book-form__group">
        <label htmlFor="genres" className="book-form__text">
          Genres:
        </label>
        <select
          id="genres"
          className="book-form__control"
          value={bookData.genres}
          onChange={changeMultilpleGenres}
          required
        >
          <option hidden>Choose genres</option>
          {bookGenres.map((genre) => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
        {selectedGenres.length !== 0 && (
          <div className="genres__wrapper">
            <h3 className="book-form__text--explanation">Genres selected:</h3>
            <ul className="genres">
              {selectedGenres.map((genre) => (
                <li key={genre} className="genre">
                  {genre}
                  <button
                    type="button"
                    className="genre__delete"
                    onClick={() => deleteGenre(genre)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="book-form__group">
        <label htmlFor="firstPublished" className="book-form__text">
          First published:
        </label>
        <input
          type="date"
          id="firstPublished"
          className="book-form__control"
          value={bookData.firstPublished}
          onChange={changeBookData}
          required
        />
      </div>
      <div className="book-form__group">
        <label htmlFor="pages" className="book-form__text">
          Total pages:
        </label>
        <input
          type="number"
          id="pages"
          className="book-form__control"
          value={bookData.pages}
          onChange={changeBookData}
          required
        />
      </div>
      <div className="book-form__group">
        <h3 className="book-form__text">State:</h3>
        <div className="book-form__states">
          <input
            type="checkbox"
            id="read"
            className="book-form__control book-form__control--hidden"
            value={bookData.state}
            onChange={changeBookState}
          />
          <label
            htmlFor="read"
            className={`book-form__text book-form__button${stateReadClassModifier}`}
          >
            Read
          </label>

          <input
            type="checkbox"
            id="toread"
            className="book-form__control book-form__control--hidden"
            value={bookData.state}
            onChange={changeBookState}
          />
          <label
            htmlFor="toread"
            className={`book-form__text book-form__button${stateToReadClassModifier}`}
          >
            To read
          </label>
        </div>
      </div>
      <div className={`book-form__group${formToReadClass}`}>
        <div>
          <label htmlFor="dateStarted" className="book-form__text">
            Date started:
          </label>
          <span className="book-form__text--explanation"> (optional)</span>
        </div>
        <input
          type="date"
          id="dateStarted"
          className="book-form__control"
          value={bookData.readDates!.dateStarted}
          onChange={changeBookReadDates}
        />
      </div>
      <div className={`book-form__group${formToReadClass}`}>
        <div>
          <label htmlFor="dateFinished" className="book-form__text">
            Date finished:
          </label>
          <span className="book-form__text--explanation"> (optional)</span>
        </div>
        <input
          type="date"
          id="dateFinished"
          className="book-form__control"
          value={bookData.readDates!.dateFinished}
          onChange={changeBookReadDates}
        />
      </div>
      <div className={`book-form__group${formToReadClass}`}>
        <div className="book-form__texts">
          <label htmlFor="yourRating" className="book-form__text">
            Your rating:
          </label>
          <span className="book-form__text--explanation">
            {" "}
            (0 to 5) *optional
          </span>
        </div>
        <input
          type="number"
          id="yourRating"
          className="book-form__control"
          value={bookData.yourRating}
          onChange={changeBookData}
          min={0}
          step={1}
          max={5}
        />
      </div>
      {errorMessage && (
        <span className="book-form__error book-form__error--bottom">
          {errorMessage}
        </span>
      )}
      <Button
        buttonType="submit"
        action={() => {}}
        isSelected={true}
        isDisabled={!isFormValid}
        classModifierName="form"
      >
        add book
      </Button>
    </form>
  );
};

export default BookForm;
