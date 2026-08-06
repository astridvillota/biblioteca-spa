import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (
    adminOnly &&
    user.rol !== "admin" &&
    user.rol !== "Administrador"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
