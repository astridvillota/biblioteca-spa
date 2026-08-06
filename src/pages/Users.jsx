import { useMemo, useState } from "react";

import { useUsers } from "../context/UserContext";

import UserTable from "../components/users/UserTable";
import UserSearchBar from "../components/users/UserSearchBar";
import UserModal from "../components/users/UserModal";

export default function Users() {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
  } = useUsers();

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = useMemo(() => {
    const text = search.toLowerCase();

    return users.filter((user) =>
      user.nombre.toLowerCase().includes(text) ||
      user.documento.toLowerCase().includes(text) ||
      user.correo.toLowerCase().includes(text)
    );
  }, [users, search]);

  function handleSave(user) {
    if (selectedUser) {
      updateUser(user);
    } else {
      addUser(user);
    }

    setSelectedUser(null);
    setModalOpen(false);
  }

  function handleEdit(user) {
    setSelectedUser(user);
    setModalOpen(true);
  }

  function handleNew() {
    setSelectedUser(null);
    setModalOpen(true);
  }

  function handleCancel() {
    setSelectedUser(null);
    setModalOpen(false);
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Gestión de Usuarios
          </h1>

          <p className="text-gray-500">
            Administre los usuarios del sistema.
          </p>

        </div>

        <button
          onClick={handleNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Nuevo Usuario
        </button>

      </div>

      <UserSearchBar
        value={search}
        onChange={setSearch}
      />

      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={deleteUser}
      />

      <UserModal
        open={modalOpen}
        onSave={handleSave}
        selectedUser={selectedUser}
        onCancel={handleCancel}
      />

    </div>
  );
}