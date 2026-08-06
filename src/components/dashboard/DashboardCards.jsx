import { FaBook, FaUsers, FaClipboardList, FaExclamationTriangle } from "react-icons/fa";
import { useBooks } from "../../context/BookContext";
import { useUsers } from "../../context/UserContext";
import { useLoans } from "../../context/LoanContext";

export default function DashboardCards() {
  const { books } = useBooks();
  const { users } = useUsers();
  const { loans } = useLoans();

  const disponibles = books.filter(
    (book) => book.disponibles > 0
  ).length;

  const vencidos = loans.filter(
    (loan) => loan.estado === "Vencido"
  ).length;

  const cards = [
    {
      titulo: "Libros",
      valor: books.length,
      color: "bg-blue-500",
      icono: <FaBook size={28} />,
    },
    {
      titulo: "Usuarios",
      valor: users.length,
      color: "bg-green-500",
      icono: <FaUsers size={28} />,
    },
    {
      titulo: "Préstamos",
      valor: loans.length,
      color: "bg-purple-500",
      icono: <FaClipboardList size={28} />,
    },
    {
      titulo: "Disponibles",
      valor: disponibles,
      color: "bg-orange-500",
      icono: <FaExclamationTriangle size={28} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.titulo}
          className={`${card.color} rounded-xl shadow-lg text-white p-6 flex justify-between items-center`}
        >
          <div>
            <p className="text-sm opacity-90">
              {card.titulo}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {card.valor}
            </h2>
          </div>

          <div>
            {card.icono}
          </div>
        </div>
      ))}
    </div>
  );
}