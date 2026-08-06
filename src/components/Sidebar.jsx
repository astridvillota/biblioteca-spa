import { Link } from "react-router-dom";

import {
  FaHome,
  FaBook,
  FaUsers,
  FaClipboardList,
  FaHistory,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaChartBar,
  FaRobot,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

export default function Sidebar() {

  const { user } = useAuth();

  const isAdmin =
    user?.role === "admin" ||
    user?.rol === "Administrador";

  return (

    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-8">

        Biblioteca

      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:text-blue-400 transition"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/books"
          className="flex items-center gap-3 hover:text-blue-400 transition"
        >
          <FaBook />
          Libros
        </Link>

        <Link
          to="/loans"
          className="flex items-center gap-3 hover:text-blue-400 transition"
        >
          <FaClipboardList />
          Préstamos
        </Link>

        {isAdmin && (
          <>

            <Link
              to="/users"
              className="flex items-center gap-3 hover:text-blue-400 transition"
            >
              <FaUsers />
              Usuarios
            </Link>

            <Link
              to="/history"
              className="flex items-center gap-3 hover:text-blue-400 transition"
            >
              <FaHistory />
              Historial
            </Link>

            <Link
              to="/reservations"
              className="flex items-center gap-3 hover:text-blue-400 transition"
            >
              <FaCalendarCheck />
              Reservas
            </Link>

            <Link
              to="/fines"
              className="flex items-center gap-3 hover:text-blue-400 transition"
            >
              <FaMoneyBillWave />
              Multas
            </Link>

            <Link
              to="/reports"
              className="flex items-center gap-3 hover:text-blue-400 transition"
            >
              <FaChartBar />
              Reportes
            </Link>

          </>
        )}

      </nav>

      <div className="mt-10 border-t border-slate-700 pt-6">

        <div className="flex items-center gap-2 text-blue-300">

          <FaRobot />

          <span>IA Biblioteca</span>

        </div>

      </div>

    </aside>

  );

}