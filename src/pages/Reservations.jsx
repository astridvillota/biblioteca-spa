import { useReservations } from "../context/ReservationContext";

export default function Reservations() {

  const { reservations } = useReservations();

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Gestión de Reservas
        </h1>

        <p className="text-gray-500">
          Administre las reservas de libros de la biblioteca.
        </p>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-3 text-center">#</th>

              <th className="p-3 text-left">Usuario</th>

              <th className="p-3 text-left">Libro</th>

              <th className="p-3 text-left">Fecha</th>

              <th className="p-3 text-left">Estado</th>

            </tr>

          </thead>

          <tbody>

            {reservations.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  No existen reservas registradas.
                </td>

              </tr>

            ) : (

              reservations.map((reservation, index) => (

                <tr
                  key={reservation.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="text-center">
                    {index + 1}
                  </td>

                  <td>{reservation.usuario}</td>

                  <td>{reservation.libro}</td>

                  <td>{reservation.fecha}</td>

                  <td>

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">

                      {reservation.estado}

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