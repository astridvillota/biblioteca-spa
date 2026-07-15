import { Link } from "react-router-dom";
import {
  FaBook,
  FaClipboardList,
  FaHistory,
  FaHome,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        Biblioteca
      </h1>

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="flex items-center gap-3 hover:text-blue-400">
          <FaHome />
          Dashboard
        </Link>

        <Link to="/books" className="flex items-center gap-3 hover:text-blue-400">
          <FaBook />
          Libros
        </Link>

        <Link to="/loans" className="flex items-center gap-3 hover:text-blue-400">
          <FaClipboardList />
          Préstamos
        </Link>

        <Link to="/history" className="flex items-center gap-3 hover:text-blue-400">
          <FaHistory />
          Historial
        </Link>
      </nav>
    </aside>
  );
}