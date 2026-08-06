// ============================================
// CLAVES DE LOCALSTORAGE
// ============================================

const BOOKS_KEY = "biblioteca_books";
const USERS_KEY = "biblioteca_users";
const LOANS_KEY = "biblioteca_loans";
const HISTORY_KEY = "biblioteca_history";
const FINES_KEY = "biblioteca_fines";
const RESERVATIONS_KEY = "biblioteca_reservations";

// ============================================
// LIBROS
// ============================================

export const defaultBooks = [
  {
    id: 1,
    isbn: "9780307474278",
    codigo: "LIB-001",
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    editorial: "Sudamericana",
    categoria: "Novela",
    anio: 1967,
    cantidad: 10,
    disponibles: 8,
    estado: "Disponible",
    portada: "",
  },
  {
    id: 2,
    isbn: "9788491050295",
    codigo: "LIB-002",
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    editorial: "Salamandra",
    categoria: "Infantil",
    anio: 1943,
    cantidad: 5,
    disponibles: 3,
    estado: "Disponible",
    portada: "",
  },
];

// ============================================
// USUARIOS
// ============================================

export const defaultUsers = [
  {
    id: 1,
    documento: "100001",
    nombre: "Administrador",
    correo: "admin@biblioteca.com",
    telefono: "3001111111",
    password: "123456",
    rol: "Administrador",
    estado: "Activo",
  },
  {
    id: 2,
    documento: "100002",
    nombre: "Usuario",
    correo: "usuario@biblioteca.com",
    telefono: "3002222222",
    password: "123456",
    rol: "Miembro",
    estado: "Activo",
  },
];

// ============================================
// PRÉSTAMOS
// ============================================

export const defaultLoans = [
  {
    id: 1,
    usuario: "Usuario",
    libro: "Cien años de soledad",
    fechaPrestamo: "2026-07-10",
    fechaDevolucion: "2026-07-17",
    estado: "Activo",
  },
];

// ============================================
// HISTORIAL
// ============================================

export const defaultHistory = [
  {
    id: 1,
    usuario: "Usuario",
    libro: "Cien años de soledad",
    accion: "Préstamo",
    fecha: "2026-07-10",
  },
];

// ============================================
// MULTAS
// ============================================

export const defaultFines = [
  {
    id: 1,
    usuario: "Usuario",
    libro: "Cien años de soledad",
    valor: 5000,
    estado: "Pendiente",
  },
];

// ============================================
// RESERVAS
// ============================================

export const defaultReservations = [
  {
    id: 1,
    usuario: "Usuario",
    libro: "El Principito",
    fecha: "2026-07-20",
    estado: "Activa",
  },
];

// ============================================
// FUNCIONES GENERALES
// ============================================

function getData(key, defaults) {
  const data = localStorage.getItem(key);

  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaults));
    return defaults;
  }

  return JSON.parse(data);
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ============================================
// LIBROS
// ============================================

export function getBooks() {
  return getData(BOOKS_KEY, defaultBooks);
}

export function saveBooks(data) {
  saveData(BOOKS_KEY, data);
}

// ============================================
// USUARIOS
// ============================================

export function getUsers() {
  return getData(USERS_KEY, defaultUsers);
}

export function saveUsers(data) {
  saveData(USERS_KEY, data);
}

// ============================================
// PRÉSTAMOS
// ============================================

export function getLoans() {
  return getData(LOANS_KEY, defaultLoans);
}

export function saveLoans(data) {
  saveData(LOANS_KEY, data);
}

// ============================================
// HISTORIAL
// ============================================

export function getHistory() {
  return getData(HISTORY_KEY, defaultHistory);
}

export function saveHistory(data) {
  saveData(HISTORY_KEY, data);
}

// ============================================
// MULTAS
// ============================================

export function getFines() {
  return getData(FINES_KEY, defaultFines);
}

export function saveFines(data) {
  saveData(FINES_KEY, data);
}

// ============================================
// RESERVAS
// ============================================

export function getReservations() {
  return getData(RESERVATIONS_KEY, defaultReservations);
}

export function saveReservations(data) {
  saveData(RESERVATIONS_KEY, data);
}