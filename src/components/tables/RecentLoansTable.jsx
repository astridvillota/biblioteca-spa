import { useLoans } from "../../context/LoanContext";

export default function RecentLoansTable() {

  const { loans } = useLoans();

  // Mostrar los últimos 5 préstamos (más recientes primero)
  const recentLoans = [...loans]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow mt-8 p-6">

      <h2 className="text-xl font-bold mb-4">
        Últimos préstamos
      </h2>

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-slate-100">

            <th className="p-3 text-left">
              Libro
            </th>

            <th className="p-3 text-left">
              Usuario
            </th>

            <th className="p-3 text-left">
              Fecha
            </th>

            <th className="p-3 text-left">
              Estado
            </th>

          </tr>

        </thead>

        <tbody>

          {recentLoans.length === 0 ? (

            <tr>

              <td
                colSpan="4"
                className="text-center p-6 text-gray-500"
              >
                No existen préstamos registrados.
              </td>

            </tr>

          ) : (

            recentLoans.map((loan) => (

              <tr
                key={loan.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="p-3">
                  {loan.libro}
                </td>

                <td className="p-3">
                  {loan.usuario}
                </td>

                <td className="p-3">
                  {loan.fechaPrestamo}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      loan.estado === "Activo"
                        ? "bg-green-600"
                        : loan.estado === "Devuelto"
                        ? "bg-blue-600"
                        : "bg-red-600"
                    }`}
                  >
                    {loan.estado}
                  </span>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );

}