// =========================================
// BUSCADOR INTELIGENTE LOCAL
// =========================================

export function aiSearch(question, books, users, loans) {

  const text = question.toLowerCase().trim();

  // ===============================
  // BUSCAR LIBRO POR TÍTULO
  // ===============================

  const book = books.find(book =>
    text.includes(book.titulo.toLowerCase())
  );

  if (book) {

    return `
📚 Libro encontrado

Título: ${book.titulo}

Autor: ${book.autor}

Editorial: ${book.editorial}

ISBN: ${book.isbn}

Disponibles: ${book.disponibles}/${book.cantidad}

Estado: ${book.estado}
`;

  }

  // ===============================
  // BUSCAR POR AUTOR
  // ===============================

  const authorBooks = books.filter(book =>
    text.includes(book.autor.toLowerCase())
  );

  if (authorBooks.length > 0) {

    return `Se encontraron ${authorBooks.length} libro(s):

${authorBooks.map(book => "• " + book.titulo).join("\n")}`;

  }

  // ===============================
  // LIBROS DISPONIBLES
  // ===============================

  if (
    text.includes("disponibles") ||
    text.includes("libros disponibles")
  ) {

    const disponibles = books.filter(
      book => book.disponibles > 0
    );

    return disponibles
      .map(book => `📘 ${book.titulo}`)
      .join("\n");

  }

  // ===============================
  // TOTAL LIBROS
  // ===============================

  if (
    text.includes("cuantos libros") ||
    text.includes("cuántos libros") ||
    text.includes("total libros")
  ) {

    return `La biblioteca tiene ${books.length} libros registrados.`;

  }

  // ===============================
  // TOTAL USUARIOS
  // ===============================

  if (
    text.includes("usuarios")
  ) {

    return `Actualmente existen ${users.length} usuarios registrados.`;

  }

  // ===============================
  // TOTAL PRÉSTAMOS
  // ===============================

  if (
    text.includes("prestamos") ||
    text.includes("préstamos")
  ) {

    return `Actualmente existen ${loans.length} préstamos registrados.`;

  }

  // ===============================
  // BUSCAR POR ISBN
  // ===============================

  const isbn = books.find(book =>
    text.includes(book.isbn)
  );

  if (isbn) {

    return `ISBN encontrado:

${isbn.titulo}

Autor: ${isbn.autor}`;

  }

  // ===============================
  // SIN RESULTADOS
  // ===============================

  return "No encontré información relacionada con tu búsqueda.";

}