import { useState } from "react";

import { useBooks } from "../context/BookContext";
import { useUsers } from "../context/UserContext";
import { useLoans } from "../context/LoanContext";

import { aiSearch } from "../services/aiSearch";

export default function Assistant() {

  const { books } = useBooks();
  const { users } = useUsers();
  const { loans } = useLoans();

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState(
    "👋 Hola. Soy el asistente inteligente de la Biblioteca."
  );

  function handleSearch() {

    if (!question.trim()) {

      setAnswer("Escriba una pregunta.");

      return;

    }

    const response = aiSearch(
      question,
      books,
      users,
      loans
    );

    setAnswer(response);

  }

  return (

    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-2xl rounded-xl border border-gray-200 z-50">

      <div className="bg-blue-700 text-white px-4 py-3 rounded-t-xl">

        <h2 className="font-semibold text-sm">

          🤖 Asistente IA Biblioteca

        </h2>

      </div>

      <div className="p-4 space-y-3">

        <textarea

          rows={2}

          placeholder="Pregunte por libros, autores, ISBN o usuarios..."

          className="w-full border rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"

          value={question}

          onChange={(e) => setQuestion(e.target.value)}

        />

        <button

          onClick={handleSearch}

          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium transition"

        >

          Consultar

        </button>

        <div

          className="bg-gray-100 rounded-lg p-3 text-sm whitespace-pre-line overflow-y-auto"

          style={{ maxHeight: "170px" }}

        >

          {answer}

        </div>

      </div>

    </div>

  );

}