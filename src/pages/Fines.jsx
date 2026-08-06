import { useFines } from "../context/FineContext";

export default function Fines() {

  const { fines } = useFines();

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Gestión de Multas

        </h1>

        <p className="text-gray-500">

          Administre las multas generadas por préstamos vencidos.

        </p>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-3 text-center">#</th>

              <th className="p-3 text-left">Usuario</th>

              <th className="p-3 text-left">Libro</th>

              <th className="p-3 text-center">Valor</th>

              <th className="p-3 text-center">Estado</th>

            </tr>

          </thead>

          <tbody>

            {fines.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >

                  No existen multas registradas.

                </td>

              </tr>

            ) : (

              fines.map((fine, index) => (

                <tr
                  key={fine.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="text-center">

                    {index + 1}

                  </td>

                  <td>{fine.usuario}</td>

                  <td>{fine.libro}</td>

                  <td className="text-center">

                    ${fine.valor.toLocaleString("es-CO")}

                  </td>

                  <td className="text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        fine.estado === "Pagada"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {fine.estado}

                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}