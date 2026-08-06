import { useMemo, useState } from "react";
import Swal from "sweetalert2";

import { useBooks } from "../context/BookContext";

import BookTable from "../components/books/BookTable";
import BookSearchBar from "../components/books/BookSearchBar";
import BookModal from "../components/books/BookModal";

export default function Books() {
  const {
    books,
    addBook,
    updateBook,
    deleteBook,
  } = useBooks();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = useMemo(() => {
    const text = search.toLowerCase();

    return books.filter(
      (book) =>
        book.titulo.toLowerCase().includes(text) ||
        book.autor.toLowerCase().includes(text) ||
        book.isbn.toLowerCase().includes(text)
    );
  }, [books, search]);

  async function handleSave(book) {
    if (selectedBook) {
      updateBook(book);

      await Swal.fire({
        icon: "success",
        title: "Libro actualizado",
        text: "Los cambios se guardaron correctamente.",
        confirmButtonColor: "#2563eb",
      });
    } else {
      addBook(book);

      await Swal.fire({
        icon: "success",
        title: "Libro registrado",
        text: "El libro fue agregado correctamente.",
        confirmButtonColor: "#2563eb",
      });
    }

    setSelectedBook(null);
    setModalOpen(false);
  }

  function handleEdit(book) {
    setSelectedBook(book);
    setModalOpen(true);
  }

  function handleNew() {
    setSelectedBook(null);
    setModalOpen(true);
  }

  function handleCancel() {
    setSelectedBook(null);
    setModalOpen(false);
  }

  async function handleDelete(book) {
    const result = await Swal.fire({
      title: "¿Eliminar libro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      deleteBook(book.id);

      await Swal.fire({
        icon: "success",
        title: "Libro eliminado",
        text: "El libro fue eliminado correctamente.",
        confirmButtonColor: "#2563eb",
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Gestión de Libros
          </h1>

          <p className="text-gray-500">
            Administre los libros de la biblioteca.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Nuevo Libro
        </button>
      </div>

      <BookSearchBar
        value={search}
        onChange={setSearch}
      />

      <BookTable
        books={filteredBooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BookModal
        open={modalOpen}
        onSave={handleSave}
        selectedBook={selectedBook}
        onCancel={handleCancel}
      />
    </div>
  );
}