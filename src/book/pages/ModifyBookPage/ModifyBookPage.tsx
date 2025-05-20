import BookForm from "../../components/BookForm/BookForm";
import useBooks from "../../hooks/useBooks";

const ModifyBookPage: React.FC = () => {
  const { createBook } = useBooks();

  return (
    <main className="page-container">
      <header className="page-header">
        <h2 className="page-header__title">Modify: </h2>
      </header>
      <BookForm action={createBook} />
    </main>
  );
};

export default ModifyBookPage;
