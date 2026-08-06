import { useState, useEffect } from "react";

import { useUsers } from "../../context/UserContext";
import { useBooks } from "../../context/BookContext";

const initialState = {
  usuario: "",
  libro: "",
  fechaPrestamo: "",
  fechaDevolucion: "",
  estado: "Activo",
};

export default function LoanForm({
  onSave,
  selectedLoan,
  onCancel,
}) {
  const { users } = useUsers();
  const { books } = useBooks();

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (selectedLoan) {
      setForm(selectedLoan);
    } else {
      setForm(initialState);
    }
  }, [selectedLoan]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.usuario ||
      !form.libro ||
      !form.fechaPrestamo ||
      !form.fechaDevolucion
    ) {
      alert("Complete todos los campos.");
      return;
    }

    onSave(form);

    setForm(initialState);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-4"
    >
      <h2 className="text-xl font-bold">
        {selectedLoan
          ? "Editar Préstamo"
          : "Nuevo Préstamo"}
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <select
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
          className="border rounded-lg p-2"
        >
          <option value="">
            Seleccione un usuario
          </option>

          {users.map((user) => (
            <option
              key={user.id}
              value={user.nombre}
            >
              {user.nombre}
            </option>
          ))}
        </select>

        <select
          name="libro"
          value={form.libro}
          onChange={handleChange}
          className="border rounded-lg p-2"
        >
          <option value="">
            Seleccione un libro
          </option>

          {books
            .filter(
              (book) => book.disponibles > 0
            )
            .map((book) => (
              <option
                key={book.id}
                value={book.titulo}
              >
                {book.titulo}
              </option>
            ))}
        </select>

        <input
          type="date"
          name="fechaPrestamo"
          value={form.fechaPrestamo}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <input
          type="date"
          name="fechaDevolucion"
          value={form.fechaDevolucion}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="border rounded-lg p-2"
        >
          <option>Activo</option>
          <option>Devuelto</option>
          <option>Vencido</option>
        </select>

      </div>

      <div className="flex gap-3">

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Guardar
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
        >
          Cancelar
        </button>

      </div>

    </form>
  );
}