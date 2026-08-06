import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Books from "../pages/Books";
import Users from "../pages/Users";
import Loans from "../pages/Loans";
import History from "../pages/History";
import Reservations from "../pages/Reservations";
import NotFound from "../pages/NotFound";

import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

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
          path="/loans"
          element={<Loans />}
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

      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}