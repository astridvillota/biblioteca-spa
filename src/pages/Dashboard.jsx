import { FaBook, FaUsers, FaClipboardList, FaClock } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { dashboardStats } from "../data/dashboardData";

import StatCard from "../components/cards/StatCard";
import LoansChart from "../components/cards/LoansChart";
import RecentLoansTable from "../components/tables/RecentLoansTable";

const icons = [
  <FaBook />,
  <FaUsers />,
  <FaClipboardList />,
  <FaClock />,
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Bienvenido, {user?.nombre}
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Panel principal del sistema de biblioteca.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {dashboardStats.map((item, index) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            color={item.color}
            icon={icons[index]}
          />
        ))}
      </div>

      <LoansChart />

      <RecentLoansTable />

    </div>
  );
}