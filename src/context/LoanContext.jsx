import { createContext, useContext, useEffect, useState } from "react";

import {
  getLoans,
  saveLoans,
} from "../services/storage";

import { useBooks } from "./BookContext";

const LoanContext = createContext();

export function LoanProvider({ children }) {

  const [loans, setLoans] = useState(getLoans());

  const {
    loanBook,
    returnBook,
    books,
  } = useBooks();

  useEffect(() => {
    saveLoans(loans);
  }, [loans]);

  // ===========================
  // Registrar préstamo
  // ===========================

  function addLoan(loan) {

    const book = books.find(
      (b) => b.titulo === loan.libro
    );

    if (!book) {

      alert("El libro no existe.");

      return false;

    }

    if (book.disponibles <= 0) {

      alert("No existen ejemplares disponibles.");

      return false;

    }

    loanBook(loan.libro);

    setLoans((prev) => [
      ...prev,
      {
        ...loan,
        id: Date.now(),
      },
    ]);

    return true;

  }

  // ===========================
  // Actualizar préstamo
  // ===========================

  function updateLoan(updatedLoan) {

    setLoans((prev) =>
      prev.map((loan) =>
        loan.id === updatedLoan.id
          ? updatedLoan
          : loan
      )
    );

  }

  // ===========================
  // Eliminar préstamo
  // ===========================

  function deleteLoan(id) {

    const loan = loans.find(
      (l) => l.id === id
    );

    if (loan && loan.estado === "Activo") {

      returnBook(loan.libro);

    }

    setLoans((prev) =>
      prev.filter((loan) => loan.id !== id)
    );

  }

  // ===========================
  // Devolver libro
  // ===========================

  function returnLoan(id) {

    setLoans((prev) =>
      prev.map((loan) => {

        if (
          loan.id === id &&
          loan.estado === "Activo"
        ) {

          returnBook(loan.libro);

          return {

            ...loan,

            estado: "Devuelto",

          };

        }

        return loan;

      })
    );

  }

  return (

    <LoanContext.Provider
      value={{

        loans,

        addLoan,

        updateLoan,

        deleteLoan,

        returnLoan,

      }}
    >

      {children}

    </LoanContext.Provider>

  );

}

export function useLoans() {
  return useContext(LoanContext);
}