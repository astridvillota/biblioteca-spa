import { createContext, useContext, useEffect, useState } from "react";

import {
  getBooks,
  saveBooks,
} from "../services/storage";

const BookContext = createContext();

export function BookProvider({ children }) {

  const [books, setBooks] = useState(getBooks());

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  // ===========================
  // Agregar libro
  // ===========================

  function addBook(book) {
    setBooks((prev) => [
      ...prev,
      {
        ...book,
        id: Date.now(),
      },
    ]);
  }

  // ===========================
  // Editar libro
  // ===========================

  function updateBook(updatedBook) {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === updatedBook.id
          ? updatedBook
          : book
      )
    );
  }

  // ===========================
  // Eliminar libro
  // ===========================

  function deleteBook(id) {
    setBooks((prev) =>
      prev.filter((book) => book.id !== id)
    );
  }

  // ===========================
  // Disminuir existencia
  // ===========================

  function loanBook(title) {

    setBooks((prev) =>
      prev.map((book) => {

        if (
          book.titulo === title &&
          book.disponibles > 0
        ) {

          return {

            ...book,

            disponibles:
              book.disponibles - 1,

          };

        }

        return book;

      })
    );

  }

  // ===========================
  // Aumentar existencia
  // ===========================

  function returnBook(title) {

    setBooks((prev) =>
      prev.map((book) => {

        if (book.titulo === title) {

          return {

            ...book,

            disponibles:
              book.disponibles + 1,

          };

        }

        return book;

      })
    );

  }

  return (

    <BookContext.Provider
      value={{

        books,

        addBook,

        updateBook,

        deleteBook,

        loanBook,

        returnBook,

      }}
    >

      {children}

    </BookContext.Provider>

  );

}

export function useBooks() {
  return useContext(BookContext);
}