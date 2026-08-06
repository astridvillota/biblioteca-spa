import { useAuth } from "../context/AuthContext";

import DashboardCards from "../components/dashboard/DashboardCards";
import Statistics from "../components/dashboard/Statistics";

import LoansChart from "../components/cards/LoansChart";
import RecentLoansTable from "../components/tables/RecentLoansTable";

export default function Dashboard() {

  const { user } = useAuth();

  return (

    <div className="space-y-8">

      {/* Encabezado */}
      <div>

        <h1 className="text-4xl font-bold text-slate-800">

          Bienvenido, {user?.nombre}

        </h1>

        <p className="text-gray-500 mt-2">

          Panel principal del Sistema de Gestión de Biblioteca.

        </p>

      </div>

      {/* Tarjetas */}
      <DashboardCards />

      {/* Estadísticas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <LoansChart />

        <Statistics />

      </div>

      {/* Tabla de últimos préstamos */}
      <RecentLoansTable />

    </div>

  );

}