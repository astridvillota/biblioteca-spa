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

<div className="fixed bottom-5 right-5 w-96 bg-white shadow-2xl rounded-xl border z-50">

<div className="bg-blue-700 text-white p-3 rounded-t-xl">

<h2 className="font-bold">

🤖 Asistente IA Biblioteca

</h2>

</div>

<div className="p-4">

<textarea
rows={3}
placeholder="Pregunte por libros, autores, ISBN, usuarios o préstamos..."
className="w-full border rounded-lg p-2"
value={question}
onChange={(e)=>setQuestion(e.target.value)}
/>

<button
onClick={handleSearch}
className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2"
>

Consultar

</button>

<div className="mt-4 bg-gray-100 rounded-lg p-3 whitespace-pre-line min-h-[120px]">

{answer}

</div>

</div>

</div>

  );

}