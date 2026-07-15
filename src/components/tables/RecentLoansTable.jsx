const loans = [
  {
    id: 1,
    libro: "Cien años de soledad",
    usuario: "Juan Pérez",
    fecha: "2026-07-10",
    estado: "Activo",
  },
  {
    id: 2,
    libro: "El Principito",
    usuario: "María Gómez",
    fecha: "2026-07-08",
    estado: "Devuelto",
  },
  {
    id: 3,
    libro: "Don Quijote",
    usuario: "Carlos Ruiz",
    fecha: "2026-07-05",
    estado: "Vencido",
  },
];

export default function RecentLoansTable() {
  return (
    <div className="bg-white rounded-xl shadow mt-8 p-6">
      <h2 className="text-xl font-bold mb-4">
        Últimos préstamos
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-3 text-left">Libro</th>
            <th className="p-3 text-left">Usuario</th>
            <th className="p-3 text-left">Fecha</th>
            <th className="p-3 text-left">Estado</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id} className="border-b">
              <td className="p-3">{loan.libro}</td>
              <td className="p-3">{loan.usuario}</td>
              <td className="p-3">{loan.fecha}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}