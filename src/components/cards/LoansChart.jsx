import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { mes: "Ene", prestamos: 12 },
  { mes: "Feb", prestamos: 18 },
  { mes: "Mar", prestamos: 10 },
  { mes: "Abr", prestamos: 25 },
  { mes: "May", prestamos: 20 },
  { mes: "Jun", prestamos: 16 },
];

export default function LoansChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">
        Préstamos por mes
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="mes" />
          <Tooltip />
          <Bar dataKey="prestamos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}