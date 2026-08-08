import { useState } from "react";

import { useBooks } from "../context/BookContext";
import { useUsers } from "../context/UserContext";
import { useLoans } from "../context/LoanContext";

import { aiSearch } from "../services/aiSearch";

export default function Assistant() {
  const { books } = useBooks();
  const { users } = useUsers();
  const { loans } = useLoans();

  const [open, setOpen] = useState(false);
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

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  }

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <button
        onClick={() => setOpen(!open)}
        title="Asistente IA Biblioteca"
        className="
          fixed
          bottom-6
          right-6
          z-[9999]
          w-14
          h-14
          rounded-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          shadow-2xl
          flex
          items-center
          justify-center
          text-2xl
          transition
          hover:scale-110
        "
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* VENTANA DEL ASISTENTE */}
      {open && (
        <div
          className="
            fixed
            bottom-24
            right-6
            z-[9998]
            w-[340px]
            max-w-[calc(100vw-32px)]
            bg-white
            rounded-2xl
            shadow-2xl
            border
            border-gray-200
            overflow-hidden
          "
        >
          {/* ENCABEZADO */}
          <div className="bg-blue-700 text-white px-4 py-3 flex items-center justify-between">
            <div>
              <h2 className="font-bold">
                🤖 Asistente IA
              </h2>

              <p className="text-xs text-blue-100">
                Biblioteca SPA
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200 text-lg"
            >
              ✕
            </button>
          </div>

          {/* CONTENIDO */}
          <div className="p-4">

            <p className="text-xs text-gray-500 mb-2">
              Pregunte por libros, autores, ISBN, usuarios o préstamos.
            </p>

            <textarea
              rows={3}
              placeholder="Ejemplo: ¿Qué libros están disponibles?"
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                p-3
                text-sm
                resize-none
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={handleSearch}
              className="
                w-full
                mt-3
                bg-blue-600
                hover:bg-blue-700
                text-white
                rounded-lg
                py-2
                text-sm
                font-semibold
                transition
              "
            >
              Consultar
            </button>

            {/* RESPUESTA */}
            <div
              className="
                mt-3
                bg-gray-100
                rounded-lg
                p-3
                text-sm
                text-gray-700
                whitespace-pre-line
                max-h-40
                overflow-y-auto
              "
            >
              {answer}
            </div>

          </div>
        </div>
      )}
    </>
  );
}