import { createContext, useContext, useState } from "react";
import { getBooks, saveBooks } from "../services/storage";

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(getBooks());

  function addBook(book) {
    const newBook = {
      ...book,
      id: Date.now(),
    };

    const updated = [...books, newBook];

    setBooks(updated);

    saveBooks(updated);
  }

  function deleteBook(id) {
    const updated = books.filter((book) => book.id !== id);

    setBooks(updated);

    saveBooks(updated);
  }

  function updateBook(bookUpdated) {
    const updated = books.map((book) =>
      book.id === bookUpdated.id ? bookUpdated : book
    );

    setBooks(updated);

    saveBooks(updated);
  }

  return (
    <LibraryContext.Provider
      value={{
        books,
        addBook,
        deleteBook,
        updateBook,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  return useContext(LibraryContext);
}