import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

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

    return users.filter(
      (user) =>
        user.nombre?.toLowerCase().includes(text) ||
        user.documento?.toLowerCase().includes(text) ||
        user.correo?.toLowerCase().includes(text)
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

  // ============================================
  // EXPORTAR USUARIOS A EXCEL
  // ============================================

  function exportUsers() {
    if (users.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No hay usuarios",
        text: "No existen usuarios para exportar.",
        confirmButtonColor: "#2563eb",
      });

      return;
    }

    const data = users.map((user) => ({
      Documento: user.documento || "",
      TipoDocumento: user.tipoDocumento || "",
      Nombre: user.nombre || "",
      Correo: user.correo || "",
      Telefono: user.telefono || "",
      Direccion: user.direccion || "",
      Ciudad: user.ciudad || "",
      FechaNacimiento: user.fechaNacimiento || "",
      Rol: user.rol || "Miembro",
      Estado: user.estado || "Activo",
      Observaciones: user.observaciones || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Usuarios"
    );

    XLSX.writeFile(
      workbook,
      "usuarios_biblioteca.xlsx"
    );

    Swal.fire({
      icon: "success",
      title: "Exportación completada",
      text: `${users.length} usuario(s) fueron exportados correctamente.`,
      confirmButtonColor: "#2563eb",
    });
  }

  // ============================================
  // IMPORTAR USUARIOS DESDE EXCEL
  // ============================================

  function importUsers(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);

        const workbook = XLSX.read(data, {
          type: "array",
        });

        const firstSheet =
          workbook.Sheets[workbook.SheetNames[0]];

        const rows = XLSX.utils.sheet_to_json(
          firstSheet,
          {
            defval: "",
          }
        );

        let imported = 0;
        let skipped = 0;

        rows.forEach((row) => {
          const documento = String(
            row.Documento || row.documento || ""
          ).trim();

          const nombre = String(
            row.Nombre || row.nombre || ""
          ).trim();

          const correo = String(
            row.Correo || row.correo || ""
          ).trim();

          // Campos obligatorios
          if (!documento || !nombre || !correo) {
            skipped++;
            return;
          }

          // Evitar documentos repetidos
          const documentoExiste = users.some(
            (user) =>
              String(user.documento).trim() === documento
          );

          // Evitar correos repetidos
          const correoExiste = users.some(
            (user) =>
              String(user.correo).trim().toLowerCase() ===
              correo.toLowerCase()
          );

          if (documentoExiste || correoExiste) {
            skipped++;
            return;
          }

          const nuevoUsuario = {
            id: Date.now() + imported,

            documento,

            tipoDocumento:
              row.TipoDocumento ||
              row.tipoDocumento ||
              "CC",

            nombre,

            correo,

            telefono:
              row.Telefono ||
              row.telefono ||
              "",

            direccion:
              row.Direccion ||
              row.direccion ||
              "",

            ciudad:
              row.Ciudad ||
              row.ciudad ||
              "",

            fechaNacimiento:
              row.FechaNacimiento ||
              row.fechaNacimiento ||
              "",

            rol:
              row.Rol ||
              row.rol ||
              "Miembro",

            estado:
              row.Estado ||
              row.estado ||
              "Activo",

            observaciones:
              row.Observaciones ||
              row.observaciones ||
              "",

            foto: "",
          };

          addUser(nuevoUsuario);

          imported++;
        });

        Swal.fire({
          icon: "success",
          title: "Importación finalizada",
          html: `
            <div style="text-align:left">
              <p><strong>Importados:</strong> ${imported}</p>
              <p><strong>Omitidos:</strong> ${skipped}</p>
              <p style="margin-top:10px">
                Los registros omitidos pueden corresponder
                a documentos/correos repetidos o campos
                obligatorios vacíos.
              </p>
            </div>
          `,
          confirmButtonColor: "#2563eb",
        });

      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Error al importar",
          text: "No fue posible leer el archivo Excel.",
          confirmButtonColor: "#dc2626",
        });
      }

      // Permite volver a seleccionar el mismo archivo
      event.target.value = "";
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <div className="space-y-6">

      {/* ENCABEZADO */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            Gestión de Usuarios
          </h1>

          <p className="text-gray-500">
            Administre los usuarios del sistema.
          </p>

        </div>

        <div className="flex flex-wrap gap-2">

          {/* IMPORTAR */}

          <label
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer transition"
          >
            📥 Importar Excel

            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={importUsers}
              className="hidden"
            />
          </label>

          {/* EXPORTAR */}

          <button
            onClick={exportUsers}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg transition"
          >
            📤 Exportar Excel
          </button>

          {/* NUEVO USUARIO */}

          <button
            onClick={handleNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            + Nuevo Usuario
          </button>

        </div>

      </div>

      {/* BUSCADOR */}

      <UserSearchBar
        value={search}
        onChange={setSearch}
      />

      {/* TABLA */}

      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={deleteUser}
      />

      {/* MODAL */}

      <UserModal
        open={modalOpen}
        onSave={handleSave}
        selectedUser={selectedUser}
        onCancel={handleCancel}
      />

    </div>
  );
}