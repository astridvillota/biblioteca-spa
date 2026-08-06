import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaQrcode,
  FaBook,
} from "react-icons/fa";

import BookQRCode from "./BookQRCode";

export default function BookTable({
  books,
  onEdit,
  onDelete,
}) {

  const [showQR, setShowQR] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  function openQR(book) {
    setSelectedBook(book);
    setShowQR(true);
  }

  function closeQR() {
    setShowQR(false);
    setSelectedBook(null);
  }

  return (
    <>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-3 text-center">Portada</th>

              <th className="p-3 text-center">Código</th>

              <th className="p-3 text-center">ISBN</th>

              <th className="p-3 text-left">Título</th>

              <th className="p-3 text-left">Autor</th>

              <th className="p-3 text-left">Editorial</th>

              <th className="p-3 text-left">Categoría</th>

              <th className="p-3 text-center">Disponibles</th>

              <th className="p-3 text-center">Estado</th>

              <th className="p-3 text-center">Acciones</th>

            </tr>

          </thead>

          <tbody>

            {books.length === 0 ? (

              <tr>

                <td
                  colSpan="10"
                  className="text-center py-10 text-gray-500"
                >

                  No hay libros registrados.

                </td>

              </tr>

            ) : (

              books.map((book) => (

                <tr
                  key={book.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-2 text-center">

                    {book.portada ? (

                      <img
                        src={book.portada}
                        alt={book.titulo}
                        className="w-16 h-20 object-cover rounded shadow mx-auto"
                      />

                    ) : (

                      <FaBook
                        size={40}
                        className="mx-auto text-gray-400"
                      />

                    )}

                  </td>

                  <td className="text-center">
                    {book.codigo || "-"}
                  </td>

                  <td className="text-center">
                    {book.isbn}
                  </td>

                  <td className="font-semibold">
                    {book.titulo}
                  </td>

                  <td>{book.autor}</td>

                  <td>{book.editorial || "-"}</td>

                  <td>{book.categoria}</td>

                  <td className="text-center">
                    {book.disponibles}/{book.cantidad}
                  </td>

                  <td className="text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        book.estado === "Disponible"
                          ? "bg-green-100 text-green-700"
                          : book.estado === "Prestado"
                          ? "bg-yellow-100 text-yellow-700"
                          : book.estado === "Agotado"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >

                      {book.estado}

                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => onEdit(book)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => onDelete(book.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                        title="Eliminar"
                      >
                        <FaTrash />
                      </button>

                      <button
                        onClick={() => openQR(book)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                        title="Código QR"
                      >
                        <FaQrcode />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <BookQRCode
        open={showQR}
        onClose={closeQR}
        book={selectedBook}
      />

    </>
  );

}