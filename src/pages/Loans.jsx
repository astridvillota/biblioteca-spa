import { useMemo, useState } from "react";

import { useLoans } from "../context/LoanContext";

import LoanTable from "../components/loans/LoanTable";
import LoanSearchBar from "../components/loans/LoanSearchBar";
import LoanModal from "../components/loans/LoanModal";

export default function Loans() {

  const {
    loans,
    addLoan,
    updateLoan,
    deleteLoan,
    returnLoan,
  } = useLoans();

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedLoan, setSelectedLoan] = useState(null);

  const filteredLoans = useMemo(() => {

    const text = search.toLowerCase();

    return loans.filter(
      (loan) =>
        loan.usuario.toLowerCase().includes(text) ||
        loan.libro.toLowerCase().includes(text)
    );

  }, [loans, search]);

  function handleSave(loan) {

    if (selectedLoan) {

      updateLoan(loan);

    } else {

      const ok = addLoan(loan);

      if (ok === false) return;

    }

    setSelectedLoan(null);
    setModalOpen(false);

  }

  function handleEdit(loan) {

    setSelectedLoan(loan);

    setModalOpen(true);

  }

  function handleNew() {

    setSelectedLoan(null);

    setModalOpen(true);

  }

  function handleCancel() {

    setSelectedLoan(null);

    setModalOpen(false);

  }

  return (

    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">

            Gestión de Préstamos

          </h1>

          <p className="text-gray-500">

            Administre los préstamos de la biblioteca.

          </p>

        </div>

        <button
          onClick={handleNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >

          + Nuevo Préstamo

        </button>

      </div>

      <LoanSearchBar
        value={search}
        onChange={setSearch}
      />

      <LoanTable
        loans={filteredLoans}
        onEdit={handleEdit}
        onDelete={deleteLoan}
        onReturn={returnLoan}
      />

      <LoanModal
        open={modalOpen}
        onSave={handleSave}
        selectedLoan={selectedLoan}
        onCancel={handleCancel}
      />

    </div>

  );

}