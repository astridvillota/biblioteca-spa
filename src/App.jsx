import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Users from "./pages/Users";
import Loans from "./pages/Loans";
import History from "./pages/History";
import Reservations from "./pages/Reservations";
import Fines from "./pages/Fines";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

export default function App() {
  return (
    <Routes>

      {/* Login */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* Zona protegida */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/books"
          element={<Books />}
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute adminOnly={true}>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loans"
          element={<Loans />}
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute adminOnly={true}>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservations"
          element={
            <ProtectedRoute adminOnly={true}>
              <Reservations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fines"
          element={
            <ProtectedRoute adminOnly={true}>
              <Fines />
            </ProtectedRoute>
          }
        />

      </Route>

      {/* Página no encontrada */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}
