export default function LoanTable({
  loans,
  onEdit,
  onDelete,
  onReturn,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-3 text-center">#</th>
            <th className="p-3 text-left">Usuario</th>
            <th className="p-3 text-left">Libro</th>
            <th className="p-3 text-center">Préstamo</th>
            <th className="p-3 text-center">Devolución</th>
            <th className="p-3 text-center">Estado</th>
            <th className="p-3 text-center">Acciones</th>

          </tr>

        </thead>

        <tbody>

          {loans.length === 0 ? (

            <tr>

              <td
                colSpan="7"
                className="text-center py-8 text-gray-500"
              >
                No existen préstamos registrados.
              </td>

            </tr>

          ) : (

            loans.map((loan, index) => (

              <tr
                key={loan.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="text-center">
                  {index + 1}
                </td>

                <td>{loan.usuario}</td>

                <td>{loan.libro}</td>

                <td className="text-center">
                  {loan.fechaPrestamo}
                </td>

                <td className="text-center">
                  {loan.fechaDevolucion}
                </td>

                <td className="text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      loan.estado === "Activo"
                        ? "bg-green-100 text-green-700"
                        : loan.estado === "Devuelto"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {loan.estado}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(loan)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => onDelete(loan.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>

                    {loan.estado === "Activo" && (

                      <button
                        onClick={() => onReturn(loan.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Devolver
                      </button>

                    )}

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}