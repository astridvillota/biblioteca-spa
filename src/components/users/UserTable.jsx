import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaUserCircle,
  FaIdCard,
} from "react-icons/fa";

import UserCarnet from "./UserCarnet";

export default function UserTable({
  users,
  onEdit,
  onDelete,
}) {
  const [showCarnet, setShowCarnet] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  function openCarnet(user) {
    setSelectedUser(user);
    setShowCarnet(true);
  }

  function closeCarnet() {
    setShowCarnet(false);
    setSelectedUser(null);
  }

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full">

          <thead className="bg-slate-100">
            <tr>

              <th className="p-3 text-center">
                Foto
              </th>

              <th className="p-3 text-left">
                Documento
              </th>

              <th className="p-3 text-left">
                Nombre
              </th>

              <th className="p-3 text-left">
                Correo
              </th>

              <th className="p-3 text-left">
                Teléfono
              </th>

              <th className="p-3 text-left">
                Rol
              </th>

              <th className="p-3 text-center">
                Estado
              </th>

              <th className="p-3 text-center">
                Acciones
              </th>

            </tr>
          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-500"
                >
                  No existen usuarios registrados.
                </td>
              </tr>

            ) : (

              users.map((user) => (

                <tr
                  key={user.id}
                  className="border-b hover:bg-slate-50"
                >

                  {/* FOTO */}
                  <td className="text-center p-2">

                    {user.foto ? (

                      <img
                        src={user.foto}
                        alt={user.nombre}
                        className="w-14 h-14 rounded-full object-cover mx-auto"
                      />

                    ) : (

                      <FaUserCircle
                        size={45}
                        className="mx-auto text-gray-400"
                      />

                    )}

                  </td>

                  {/* DOCUMENTO */}
                  <td className="p-3">
                    {user.documento}
                  </td>

                  {/* NOMBRE */}
                  <td className="font-semibold p-3">
                    {user.nombre}
                  </td>

                  {/* CORREO */}
                  <td className="p-3">
                    {user.correo}
                  </td>

                  {/* TELEFONO */}
                  <td className="p-3">
                    {user.telefono || "-"}
                  </td>

                  {/* ROL */}
                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.rol === "Administrador"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.rol}
                    </span>

                  </td>

                  {/* ESTADO */}
                  <td className="text-center p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.estado === "Activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.estado}
                    </span>

                  </td>

                  {/* ACCIONES */}
                  <td className="p-3">

                    <div className="flex justify-center gap-2">

                      {/* EDITAR */}
                      <button
                        onClick={() => onEdit(user)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                        title="Editar usuario"
                      >
                        <FaEdit />
                      </button>

                      {/* ELIMINAR */}
                      <button
                        onClick={() => onDelete(user.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                        title="Eliminar usuario"
                      >
                        <FaTrash />
                      </button>

                      {/* CARNET */}
                      <button
                        onClick={() => openCarnet(user)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                        title="Ver carnet"
                      >
                        <FaIdCard />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>
      </div>

      {/* CARNET DEL USUARIO */}
      <UserCarnet
        user={showCarnet ? selectedUser : null}
        onClose={closeCarnet}
      />
    </>
  );
}