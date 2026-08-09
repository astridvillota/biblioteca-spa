import { useMemo, useRef, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

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

  const fileInputRef = useRef(null);

  // =========================================================
  // FILTRO DE LIBROS
  // =========================================================

  const filteredBooks = useMemo(() => {
    const text = search.toLowerCase();

    return books.filter(
      (book) =>
        (book.titulo || "").toLowerCase().includes(text) ||
        (book.autor || "").toLowerCase().includes(text) ||
        (book.isbn || "").toLowerCase().includes(text)
    );
  }, [books, search]);

  // =========================================================
  // GUARDAR LIBRO
  // =========================================================

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

  // =========================================================
  // EDITAR LIBRO
  // =========================================================

  function handleEdit(book) {
    setSelectedBook(book);
    setModalOpen(true);
  }

  // =========================================================
  // NUEVO LIBRO
  // =========================================================

  function handleNew() {
    setSelectedBook(null);
    setModalOpen(true);
  }

  // =========================================================
  // CANCELAR
  // =========================================================

  function handleCancel() {
    setSelectedBook(null);
    setModalOpen(false);
  }

  // =========================================================
  // ELIMINAR LIBRO
  // =========================================================

  async function handleDelete(bookId) {
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
      deleteBook(bookId);

      await Swal.fire({
        icon: "success",
        title: "Libro eliminado",
        text: "El libro fue eliminado correctamente.",
        confirmButtonColor: "#2563eb",
      });
    }
  }

  // =========================================================
  // EXPORTAR LIBROS A EXCEL
  // =========================================================

  function handleExportExcel() {
    if (!books || books.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No hay libros",
        text: "No existen libros para exportar.",
        confirmButtonColor: "#2563eb",
      });

      return;
    }

    const data = books.map((book) => ({
      ID: book.id || "",
      ISBN: book.isbn || "",
      Código: book.codigo || "",
      Título: book.titulo || "",
      Autor: book.autor || "",
      Editorial: book.editorial || "",
      Edición: book.edicion || "",
      Idioma: book.idioma || "",
      Categoría: book.categoria || "",
      Ubicación: book.ubicacion || "",
      Descripción: book.descripcion || "",
      Año: book.anio || "",
      Cantidad: book.cantidad || 0,
      Disponibles: book.disponibles || 0,
      Estado: book.estado || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Libros"
    );

    XLSX.writeFile(
      workbook,
      "biblioteca_libros.xlsx"
    );

    Swal.fire({
      icon: "success",
      title: "Exportación completada",
      text: "Los libros fueron exportados correctamente a Excel.",
      confirmButtonColor: "#2563eb",
    });
  }

  // =========================================================
  // ABRIR SELECTOR DE ARCHIVO
  // =========================================================

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  // =========================================================
  // IMPORTAR LIBROS DESDE EXCEL
  // =========================================================

  function handleImportExcel(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const extension = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (!["xlsx", "xls"].includes(extension)) {
      Swal.fire({
        icon: "error",
        title: "Archivo no válido",
        text: "Seleccione un archivo Excel con extensión .xlsx o .xls.",
        confirmButtonColor: "#2563eb",
      });

      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);

        const workbook = XLSX.read(data, {
          type: "array",
        });

        const firstSheetName =
          workbook.SheetNames[0];

        if (!firstSheetName) {
          throw new Error(
            "El archivo no contiene hojas."
          );
        }

        const worksheet =
          workbook.Sheets[firstSheetName];

        const rows = XLSX.utils.sheet_to_json(
          worksheet,
          {
            defval: "",
          }
        );

        if (!rows.length) {
          Swal.fire({
            icon: "warning",
            title: "Excel vacío",
            text: "El archivo no contiene registros para importar.",
            confirmButtonColor: "#2563eb",
          });

          event.target.value = "";
          return;
        }

        let imported = 0;
        let skipped = 0;

        for (let index = 0; index < rows.length; index++) {
          const row = rows[index];

          const titulo = String(
            row["Título"] ||
            row["Titulo"] ||
            row["titulo"] ||
            ""
          ).trim();

          const autor = String(
            row["Autor"] ||
            row["autor"] ||
            ""
          ).trim();

          const isbn = String(
            row["ISBN"] ||
            row["isbn"] ||
            ""
          ).trim();

          const categoria = String(
            row["Categoría"] ||
            row["Categoria"] ||
            row["categoria"] ||
            ""
          ).trim();

          // Los campos principales son obligatorios
          if (
            !titulo ||
            !autor ||
            !isbn ||
            !categoria
          ) {
            skipped++;
            continue;
          }

          // Evitar importar nuevamente un ISBN existente
          const exists = books.some(
            (book) =>
              String(book.isbn).trim() === isbn
          );

          if (exists) {
            skipped++;
            continue;
          }

          const cantidadValue = Number(
            row["Cantidad"] || 1
          );

          const disponiblesValue = Number(
            row["Disponibles"] !== ""
              ? row["Disponibles"]
              : cantidadValue
          );

          const anioValue = Number(
            row["Año"] ||
            row["Anio"] ||
            ""
          );

          const newBook = {
            isbn,
            codigo: String(
              row["Código"] ||
              row["Codigo"] ||
              row["codigo"] ||
              ""
            ).trim(),

            titulo,

            autor,

            editorial: String(
              row["Editorial"] || ""
            ).trim(),

            edicion: String(
              row["Edición"] ||
              row["Edicion"] ||
              ""
            ).trim(),

            idioma: String(
              row["Idioma"] ||
              "Español"
            ).trim(),

            categoria,

            ubicacion: String(
              row["Ubicación"] ||
              row["Ubicacion"] ||
              ""
            ).trim(),

            descripcion: String(
              row["Descripción"] ||
              row["Descripcion"] ||
              ""
            ).trim(),

            anio: Number.isNaN(anioValue)
              ? ""
              : anioValue,

            cantidad:
              Number.isFinite(cantidadValue) &&
              cantidadValue > 0
                ? cantidadValue
                : 1,

            disponibles:
              Number.isFinite(disponiblesValue) &&
              disponiblesValue >= 0
                ? disponiblesValue
                : 0,

            estado: String(
              row["Estado"] ||
              "Disponible"
            ).trim(),

            portada: "",
          };

          addBook(newBook);

          imported++;

          // Evita generar dos IDs iguales
          // porque addBook utiliza Date.now().
          if (index < rows.length - 1) {
            await new Promise((resolve) =>
              setTimeout(resolve, 2)
            );
          }
        }

        await Swal.fire({
          icon:
            imported > 0
              ? "success"
              : "warning",

          title: "Importación finalizada",

          html: `
            <div style="text-align: left;">
              <p><strong>Importados:</strong> ${imported}</p>
              <p><strong>Omitidos:</strong> ${skipped}</p>
              <p style="margin-top: 10px;">
                Los registros omitidos pueden corresponder
                a ISBN repetidos o campos obligatorios vacíos.
              </p>
            </div>
          `,

          confirmButtonColor: "#2563eb",
        });
      } catch (error) {
        console.error(
          "Error al importar Excel:",
          error
        );

        Swal.fire({
          icon: "error",
          title: "Error al importar",
          text: "No fue posible leer correctamente el archivo Excel.",
          confirmButtonColor: "#2563eb",
        });
      }

      event.target.value = "";
    };

    reader.onerror = () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No fue posible leer el archivo seleccionado.",
        confirmButtonColor: "#2563eb",
      });

      event.target.value = "";
    };

    reader.readAsArrayBuffer(file);
  }

  // =========================================================
  // INTERFAZ
  // =========================================================

  return (
    <div className="space-y-6">

      {/* ENCABEZADO */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Gestión de Libros
          </h1>

          <p className="text-gray-500">
            Administre los libros de la biblioteca.
          </p>
        </div>

        {/* BOTONES */}
        <div className="flex flex-wrap gap-2">

          <button
            onClick={handleImportClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            📥 Importar Excel
          </button>

          <button
            onClick={handleExportExcel}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            📤 Exportar Excel
          </button>

          <button
            onClick={handleNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            + Nuevo Libro
          </button>

        </div>

      </div>

      {/* INPUT OCULTO PARA EXCEL */}

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleImportExcel}
        className="hidden"
      />

      {/* BUSCADOR */}

      <BookSearchBar
        value={search}
        onChange={setSearch}
      />

      {/* TABLA */}

      <BookTable
        books={filteredBooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* MODAL */}

      <BookModal
        open={modalOpen}
        onSave={handleSave}
        selectedBook={selectedBook}
        onCancel={handleCancel}
      />

    </div>
  );
}